import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './testchat.css';

const WhatsAppClone = () => {
  // WebSocket URL (you'll need to replace this with your actual socket URL)
  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'ws://localhost:4040';

  // Configure axios defaults
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
  axios.defaults.withCredentials = true;

  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [file, setFile] = useState(null);
  const socketRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 786);

  // Fetch online users and chat history
  const fetchChatHistory = async () => {
    try {
      const response = await axios.post('/messages/chatuserhistory');
      setOnlineUsers(response.data.chatUsers);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  // Fetch chat history for specific user
  const fetchChatHistoryOfUser = async (userId) => {
    try {
      const response = await axios.post('/messages/getsmessages', { userId });
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching user chat history:', error);
    }
  };

  // Establish WebSocket connection and fetch initial data
  useEffect(() => {
    fetchChatHistory();

    // Resize handler
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 786);
    };
    window.addEventListener('resize', handleResize);

    // WebSocket setup
    socketRef.current = new WebSocket(SOCKET_URL);

    socketRef.current.onopen = () => {
      console.log('WebSocket connected');
    };

    // Listen for messages from WebSocket server
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.text && (data.recipient === selectedFriend?._id || data.sender === selectedFriend?._id)) {
        setChats((prevChats) => [...prevChats, data]);
      }
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      socketRef.current.close();
    };
  }, [selectedFriend]);

  // Send message handler
  const sendMessage = () => {
    if (!message && !file) return;

    const messageData = {
      recipient: selectedFriend._id,
      text: message,
      file: file ? { name: file.name, data: file.data } : null,
    };

    // Send message via WebSocket
    socketRef.current.send(JSON.stringify(messageData));
    
    // Update local chat state
    setChats((prevChats) => [
      ...prevChats, 
      { 
        sender: 'me', 
        text: message, 
        file: file ? file.name : null 
      }
    ]);

    // Clear message and file
    setMessage('');
    setFile(null);
  };

  // Handle file input
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile({ name: uploadedFile.name, data: reader.result.split(',')[1] });
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  // Select friend and load chat history
  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    fetchChatHistory(friend._id);
    fetchChatHistoryOfUser(friend._id);
  };

  // Close chat
  const closeChat = () => {
    setSelectedFriend(null);
    setChats([]);
  };

  return (
    <div className="ujj-chat-container">
      {/* Friends List */}
      <div className={`ujj-friends-list ${isMobile && selectedFriend ? 'ujj-hidden' : ''}`}>
        <div className="ujj-friends-header">Chat History</div>
        {onlineUsers.map(friend => (
          <div 
            key={friend._id} 
            className="ujj-friend-item"
            onClick={() => handleFriendSelect(friend)}
          >
            <div className="ujj-friend-avatar">
              <img 
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" 
                alt={friend.name} 
                style={{width: '100%', height: '100%', borderRadius: '50%'}}
              />
            </div>
            <div className="ujj-friend-name">
              <strong>{friend.email || friend.name}</strong>
              <span>{friend.profession}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Chat Section */}
      {selectedFriend && (
        <div className={`ujj-chat-section ${isMobile && !selectedFriend ? 'ujj-hidden' : ''}`}>
          {/* Chat Header */}
          <div className="ujj-chat-header">
            <div className="ujj-friend-avatar">
              <img 
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" 
                alt={selectedFriend.name} 
                style={{width: '100%', height: '100%', borderRadius: '50%'}}
              />
            </div>
            <div className="ujj-friend-name">{selectedFriend.name}</div>
            {isMobile && (
              <button 
                className="ujj-close-chat-btn"
                onClick={closeChat}
              >
                ×
              </button>
            )}
          </div>
          
          {/* Messages Area */}
          <div className="ujj-chat-messages">
            {chats.map((chat, index) => (
              <div 
                key={index} 
                className={`ujj-message ${chat.sender === 'me' ? 'ujj-message-sent' : 'ujj-message-received'}`}
              >
                {chat.file ? (
                  <a 
                    href={`${axios.defaults.baseURL}/uploads/${chat.file}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {chat.file}
                  </a>
                ) : (
                  chat.text
                )}
              </div>
            ))}
          </div>
          
          {/* Input Area */}
          <div className="ujj-chat-input">
            <input 
              type="text" 
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <input 
              type="file" 
              onChange={handleFileChange} 
              style={{display: 'none'}}
              id="file-upload"
            />
            <label htmlFor="file-upload" className="ujj-file-upload-btn">
              📎
            </label>
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppClone;