import React from 'react';
import './usercard.css'; // Optional: import CSS for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UserCard = ({ user, onStartChat }) => {
  axios.defaults.baseURL = 'http://localhost:4040';
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const startChat = async (iddd) => {
    try {
      const cardid=user.id;
      console.log("user: ",user)
    const response=  await axios.post('/messages/adduserinchat',{cardid});
    // const response1 = await axios.post('/messages/chatuserhistory');
    // console.log(response1);
      onStartChat(user.id); 
      if(response.data.success){
        navigate('/dashboard/chats');
      }

    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} className="user-avatar" />
      <div className="user-info">
        <h3 className="user-name">{user.name}</h3>
        <p className="user-profession">{user.profession}</p>
        <p className="user-hourly-rate">Hourly Rate: ${user.hourlyRate}</p>
        <button className="start-chat-btn" onClick={startChat}>
          Start Chat
        </button>
      </div>
    </div>
  );
};

export default UserCard;
