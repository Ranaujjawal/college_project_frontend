import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chat.css'
// WebSocket URL (adjust if needed)
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL//'ws://localhost:4040'; // replace with your backend WebSocket URL

const Chats = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
    axios.defaults.withCredentials = true;
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]); // Chat history with a specific user
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null); // Selected user for chat
  const [onlineUsers, setOnlineUsers] = useState([]); // Online users list
  const [file, setFile] = useState(null); // File to upload
  const socketRef = useRef(null); // Store WebSocket reference

  // Fetch online users and chat history
  const fetchChatHistory = async (userId) => {
    try {
      const response = await axios.post('/messages/chatuserhistory');
     // console.log(response.data); // API call to fetch chat history
      
      setOnlineUsers(response.data.chatUsers);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };
  const fetchchathistoryofusers=async(userId)=>{
    try {
      //console.log("recipent id",userId);
      const response = await axios.post('/messages/getsmessages',{userId});
      setChats(response.data);
      //console.log(response.data);
    } catch (error) {
      
    }
  }
 
  // Establish WebSocket connection
  useEffect(() => {
    fetchChatHistory();
    socketRef.current = new WebSocket(SOCKET_URL);

    socketRef.current.onopen = () => {
      console.log('WebSocket connected');
    };

    // Listen for messages from WebSocket server
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.text && (data.recipient === selectedUserId || data.sender === selectedUserId)) {
        // Append new message to chats if it's from the currently selected user
        setChats((prevChats) => [...prevChats, data]);
      }
    };

    socketRef.current.onclose = () => {
      //console.log('WebSocket disconnected');
    };

    return () => {
      socketRef.current.close(); // Cleanup WebSocket connection on unmount
    };
  }, [selectedUserId]);

  // Handle sending a new message
  const sendMessage = () => {
    if (!message && !file) return; // Prevent sending if both message and file are empty

    const messageData = {
      recipient: selectedUserId,
      text: message,
      file: file ? { name: file.name, data: file.data } : null,
    };

    // Send message to WebSocket server
    socketRef.current.send(JSON.stringify(messageData));
    setChats((prevChats) => [...prevChats, { sender: 'me', text: message, file: file ? file.name : null }]);
    // Clear the message input and file after sending
    setMessage('');
    setFile(null);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFile({ name: file.name, data: reader.result.split(',')[1] });
        };
        reader.readAsDataURL(file);
    }
  };

  // When a user is clicked, load their chat history
  const handleUserSelect = (userId,name) => {
    setSelectedUserId(userId);
    fetchChatHistory(userId);
    fetchchathistoryofusers(userId);
    setSelectedUserName(name) // Fetch chat history for the selected user
  };

  return (
    <div className="chats-container">

      {/* Sidebar: Online users */}
      <div className="sidebarchat">
      <h3 className='chat-historyh2'>Past Chats</h3>
      <ul>
        {Array.isArray(onlineUsers) && onlineUsers.length > 0 ? (
          onlineUsers.map((chatUser) => (
            <button className='chatbutton' key={chatUser._id} onClick={() => handleUserSelect(chatUser._id,chatUser.name)}>
              {chatUser.email ? chatUser.email : chatUser.name} {/* Display name or email */}
            </button>
          ))
        ) : (
          <li>No users online</li>
        )}
      </ul>
    </div>

      {/* Main Chat Area */}
      <div className="chat-area">
        {selectedUserId ? (
          <>
            <div className="chat-history">
            <h3 className='chat-historyh2'>chatting with {selectedUserName}</h3>
              {chats.map((chat) => (
                <div key={chat._id} className={chat.sender === selectedUserId ? 'incoming' : 'outgoing'}>
                  {chat.file ? (
                    <div className="file-message">
                      <a href={axios.defaults.baseURL + '/uploads/' + chat.file} target="_blank" rel="noopener noreferrer">
                     
                        {chat.file}
                      </a>
                    </div>
                  ) : (
                    <p>{chat.text}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Input Area: Message and file input */}
            <div className="chat-input">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              {/* <input type="file" onChange={handleFileChange} /> */}
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <p className='chat-historyh2'>Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default Chats;
