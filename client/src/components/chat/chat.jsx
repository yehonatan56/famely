import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { Input } from '@mantine/core';

import { getUserDataSelector } from '../../store/selectors/user.selector';
import Navbar from '../navbar/navbar';

function Chat() {
  const [isChat, setIsChat] = useState(false);
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);
  const [roomDetails, setRoomDetails] = useState({});
  const [inputMessage, setInputMessage] = useState('');
  const chatMessagesRef = useRef(null);
  const user = useSelector((state) => getUserDataSelector(state));
  const id = user._id;

  const clientIO = useRef(null);

  useEffect(() => {
    if (!name) return;

    const room = id;

    clientIO.current = io("http://localhost:3001/", { transports: ['websocket', 'polling', 'flashsocket'] });

    clientIO.current.emit("join", { username: name, room });

    clientIO.current.on("connect", () => {
      console.log("Connected to server...");
    });

    clientIO.current.on("message", messageObj => {
      setMessages(prevMessages => [...prevMessages, messageObj]);
      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      }
    });

    clientIO.current.on("roomUsers", roomDetails => {
      setRoomDetails(roomDetails);
    });

    clientIO.current.on("chats", chats => {
      console.log("Chats ", chats);
    });

    return () => clientIO.current.disconnect(); // Clean up on component unmount
  }, [id, name]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (inputMessage.trim()) {
      clientIO.current.emit('chatMessage', inputMessage);
      setInputMessage('');
    }
  };

  const handleNameSubmit = (event) => {
    event.preventDefault();
    setIsChat(true);
  };

  return (
    <div>
      <Navbar />
      {!isChat ?
        <form onSubmit={handleNameSubmit}>
          <Input
            placeholder='Enter name'
            onChange={e => setName(e.target.value)}
            required
          />
          <button type="submit">Join Chat</button>
        </form>
        : (
          <>
            <h2 id="greet-user">Welcome {name}!</h2>
            <div className="chat-messages" ref={chatMessagesRef}>
              {messages.map((msg, index) => (
                <div key={index} className="message" style={{ backgroundColor: msg.username === name ? 'blue' : '--ChatRoom Bot--' === msg.username ? 'green' : 'white' }}>
                  <p className="meta">{msg.username} <span>{msg.time}</span></p>
                  <p className="text">{msg.message}</p>
                </div>
              ))}
            </div>
            <form id="chat-form" onSubmit={sendMessage}>
              <input
                type="text"
                name="msg"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                required
              />
              <button type="submit">Send</button>
            </form>
            <div id="users">
              {roomDetails.users && roomDetails.users.map((user, index) => (
                <li key={index}>{user.username}</li>
              ))}
            </div>
          </>
        )
      }
    </div>
  );
}

export default Chat;
