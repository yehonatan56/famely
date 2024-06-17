// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import io from 'socket.io-client';
// import { getFromStore } from '../../logic/store';

// function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [roomDetails, setRoomDetails] = useState({});
//   const [inputMessage, setInputMessage] = useState('');
//   const chatMessagesRef = useRef(null);
  
//   const navigate = useNavigate();
//   const nickName =  prompt('Please enter your nickname'); // Falsazzzlback to prompt if no nickname
  
//   useEffect(() => {
//     const storedData = getFromStore("user");
//     if (!storedData) {
//       navigate("/");
//       return;
//     };
    
//     const id = storedData._id;
//     //const user = JSON.parse(localStorage.getItem("user"));
//     const room = id;

//     const clientIO = io("http://localhost:3001/", { transports: ['websocket', 'polling', 'flashsocket'] });

//     clientIO.emit("join", { username: nickName, room });

//     clientIO.on("connect", () => {
//       console.log("Connected to server...");
//     });

//     clientIO.on("message", messageObj => {
//       setMessages(prevMessages => [...prevMessages, messageObj]);
//       if (chatMessagesRef.current) {
//         chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
//       }
//     });

//     clientIO.on("roomUsers", roomDetails => {
//       setRoomDetails(roomDetails);
//     });

//     clientIO.on("chats", chats => {
//       console.log("Chats ", chats);
//     });

//     return () => clientIO.disconnect(); // Clean up on component unmount
//   }, []);

//   const sendMessage = (event) => {
//     event.preventDefault();
//     const clientIO = io("http://localhost:3001/");
//     if (inputMessage.trim()) {
//       clientIO.emit('chatMessage', inputMessage);
//       setInputMessage('');
//     }
//   };

//   return (
//     <div>
//       <h2 id="greet-user">Welcome {nickName}!</h2>
//       <div className="chat-messages" ref={chatMessagesRef}>
//         {messages.map((msg, index) => (
//           <div key={index} className="message" style={{ backgroundColor: msg.username === nickName ? 'blue' : '--ChatRoom Bot--' === msg.username ? 'green' : 'white' }}>
//             <p className="meta">{msg.username} <span>{msg.time}</span></p>
//             <p className="text">{msg.message}</p>
//           </div>
//         ))}
//       </div>
//       <form id="chat-form" onSubmit={sendMessage}>
//         <input
//           type="text"
//           name="msg"
//           value={inputMessage}
//           onChange={e => setInputMessage(e.target.value)}
//           placeholder="Type a message..."
//           required
//         />
//         <button type="submit">Send</button>
//       </form>
//       <div id="users">
//         {roomDetails.users && roomDetails.users.map((user, index) => (
//           <li key={index}>{user.username}</li>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Chat;

import React from 'react'

export default function Chat() {
  return (
    <div>Chat</div>
  )
}
