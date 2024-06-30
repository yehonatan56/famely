import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { Input } from '@mantine/core';
import './chat.css';
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

  const clientIO = useRef(null); // Use useRef to persist the socket instance

  useEffect(() => {
    if (!name) return;

    if (!clientIO.current) {
      clientIO.current = io("http://localhost:3001/", { transports: ['websocket', 'polling', 'flashsocket'] });

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
    }

    const room = id;
    clientIO.current.emit("join", { username: name, room });

    return () => {
      if (clientIO.current) {
        clientIO.current.disconnect();
        clientIO.current = null; // Reset the ref to ensure clean up
      }
    };
  }, [name, id]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (inputMessage.trim()) {
      const msg = {
        username: name,
        message: inputMessage,
        time: new Date().toLocaleTimeString()
      };
      setMessages(prevMessages => [...prevMessages, msg]);
      clientIO.current.emit('chatMessage', msg);
      setInputMessage('');
    }
  };

  const handleNameSubmit = (event) => {
    event.preventDefault();
    if (name.trim()) {
      setIsChat(true);
    }
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
            <div className="chat" ref={chatMessagesRef}>
              {messages.map((msg, index) => (
                <div key={index} className="message" style={{
                  backgroundColor: msg.username === name ? 'blue' :
                    '--ChatRoom Bot--' === msg.username ? 'gray' : 'white'
                }}>
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
