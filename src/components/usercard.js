import React, { useEffect, useState } from 'react';
import './usercard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import I1 from './images/I9.jpg'
const StarRating = ({ rating, interactive = false, onRatingChange = null }) => {
  const [hoverRating, setHoverRating] = useState(0);
  //console.log(rating)
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${
            (interactive ? (hoverRating || rating) : rating) >= star ? '' : 'empty'
          }`}
          onClick={() => interactive && onRatingChange?.(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const RatingModal = ({ isOpen, onClose, onSubmit, userName }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      // You can add your rating submission API call here
      await onSubmit(selectedRating);
      setSelectedRating(0);
      onClose();
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h3 className="modal-title">Rate {userName}</h3>
        <div className="modal-stars">
          <StarRating
            rating={selectedRating}
            interactive={true}
            onRatingChange={setSelectedRating}
          />
        </div>
        <button 
          className="submit-rating-btn"
          onClick={handleSubmit}
          disabled={!selectedRating}
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

const UserCard = ({ user, onStartChat }) => {
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
  axios.defaults.withCredentials = true;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRating, setCurrentRating] = useState(user.rating || 0);
  const [avurl,setAvurl]=useState(user.avatar);
  useEffect(()=>{
    setAvurl(user.avatar);
   // console.log(avurl);
    if(avurl==="default-avatar.png"){
      setAvurl(I1);
    }
   // console.log(avurl);
  },[])
  axios.defaults.baseURL = 'http://localhost:4040';
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const startChat = async (iddd) => {
    try {
      const cardid = user.id;
      //console.log("user: ", user);
      const response = await axios.post('/messages/adduserinchat', { cardid });
      if(response.data.success) {
        onStartChat(user.id);
        navigate('/dashboard/chats');
      }
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  const handleRatingSubmit = async (rating) => {
    try {
      // Add your API call to submit the rating
      const response = await axios.post('/auth/rating/update', {
        userId: user.id,
        rating: rating
      });
      
      if (response.data.success) {
        const newTotalRatings = user.totalrating + 1;
    const newRating = ((user.rating * user.totalrating) + rating) / newTotalRatings;
        setCurrentRating(newRating);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <>
      <div className="user-card">
        <img src={avurl}
  alt={user.name}
  className="user-avatar" />
        <div className="user-info">
          <h3 className="user-name">{user.name}</h3>
          <p className="user-profession">{user.profession}</p>
          <div className="rating-container">
            <StarRating rating={currentRating} />
          </div>
          <p className="user-hourly-rate">Hourly Rate: ${user.hourlyRate}</p>
          
          <div className="button-group">
            <button className="start-chat-btn" onClick={startChat}>
              Start Chat
            </button>
            <button 
              className="rate-user-btn"
              onClick={() => setIsModalOpen(true)}
            >
              Rate User
            </button>
          </div>
        </div>
      </div>

      <RatingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRatingSubmit}
        userName={user.name}
      />
    </>
  );
};

export default UserCard;