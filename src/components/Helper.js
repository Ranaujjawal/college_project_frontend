import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from './usercard'; // Import the UserCard component
import { useNavigate  } from 'react-router-dom';
import Filter from './filter.js'
import './helper.css'
import I14 from './images/I14.webp'
import { Verified, WrapText } from 'lucide-react';
const Helper = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
  axios.defaults.withCredentials = true;
 const navigate = useNavigate ();
  const [workers, setWorkers] = useState([]); // State to hold workers data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to handle errors
  const [appliedfilter, setAppliedfilter] = useState(''); // State to track search input
  const [filters, setFilters] = useState({
    location: {
        description: '',
        coordinates: [], // [longitude, latitude]
      },
  minRating: '',
  maxPrice: '',
  profession: '',
  radius: '',
  sortBy: '',
  });
  // Fetch workers based on the search query
  const fetchWorkers = async (queryParams = {}) => {
    try {
      const response = await axios.post('/auth/workers', {params:filters}); // Pass query params
      const workerdata = response.data.workers;
     // console.log(workerdata)
      setWorkers(workerdata); // Set the fetched workers data
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching workers:', error);
      setError('Failed to fetch workers'); // Set error state
      setLoading(false); // Set loading to false in case of error
    }
  };
  
  function capitalizationFirstLetter(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  // Handle input change in the search bar
  const handleSearchChange = (FilteredData,appliedFilterss) => {
     
     setAppliedfilter(appliedFilterss);
   // console.log(FilteredData)
    setWorkers(FilteredData);
  };

  // Fetch workers when the component mounts (initial load)
  useEffect(() => {
    fetchWorkers(); // Fetch all workers initially
  }, []);

  // Handle starting a chat with a worker
  const handleStartChat = (userId) => {
    console.log('Start chat with user ID:', userId);
    // Logic to initiate chat goes here
  };

  // Show loading text while fetching
  if (loading) return <div>Loading...</div>;

  // Show error message if there's any error
  if (error) return <div>{error}</div>;
  const filterContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    flexWrap: 'wrap',
    marginTop: '10px',
    marginBottom: '10px',
  };

  const filterItemStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: 'medium',
    padding: '4px 8px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginRight: '4px',
  };

  const abc = {
         display: 'flex' ,
         flexDirection: 'row',
  }

  const valueStyle = {
    color: '#555',
  };
  return (
    <div className="helper-container">
       
       <div className="hero-banner">
                <div className="slogan">
                    <p className="slogan1">Get the Best Services & Unmatched Experience!</p>
                    <hr />
                    <p className="slogan2">Connecting You to Reliable Services, Wherever and Whenever You Need Them!</p>
                    <Filter className='alignfilter' onSubmit={handleSearchChange}/>
                </div>
                <div>
                    <img
                        className="hero-banner-image"
                        src={I14}
                        alt="Hero Banner"
                    />
                </div>
              
            </div>

      <div className='AppliedFiltercontainer'>
      <h2 className='appliedfilterhead'>Applied Filters</h2>
      {appliedfilter ? (
        <div style={filterContainerStyle}>
          {appliedfilter.location && appliedfilter.location.description && (
            <div style={filterItemStyle}>
              <span style={labelStyle}>Location:</span>
              <span style={valueStyle}>{appliedfilter.location.description}</span>
            </div>
          )}
          {appliedfilter.minRating && (
            <div style={filterItemStyle}>
              <span style={labelStyle}>Rating:</span>
              <span style={valueStyle}>{capitalizationFirstLetter(appliedfilter.minRating)}</span>
            </div>
          )}
          {appliedfilter.maxPrice && (
            <div style={filterItemStyle}>
              <span style={labelStyle}>Price:</span>
              <span style={valueStyle}>{appliedfilter.maxPrice}</span>
            </div>
          )}
          {appliedfilter.profession && (
            <div style={filterItemStyle}>
              <span style={labelStyle}>Profession:</span>
              <span style={valueStyle}>{capitalizationFirstLetter(appliedfilter.profession)}</span>
            </div>
          )}
          {appliedfilter.radius && (
            <div style={filterItemStyle}>
              <span style={labelStyle}>Radius:</span>
              <span style={valueStyle}>{appliedfilter.radius} km</span>
            </div>
          )}
          {appliedfilter.sortBy && (
            <div style={filterItemStyle}>
              <span style={labelStyle}>Sort By:</span>
              <span style={valueStyle}>{capitalizationFirstLetter(appliedfilter.sortBy)}</span>
            </div>
          )}
        </div>
      ) : (
        <p >No filters applied.</p>
      )}
    </div>
    

      {/* Workers listing */}
      <div className="user-cards-container usercardmodern-container  ">
        <div className="usercardmodern-card-grid">
        {workers.length > 0 ? (
          workers.map((worker) => (
            <UserCard
              key={worker._id} // Use a unique key for each card
              user={{
                id: worker._id,
                avatar: worker.avatar, // Adjust according to your API response
                name: worker.name,
                profession: worker.profession,
                hourlyRate: worker.hourlyRate,
                rating:worker.rating,
                totalrating:worker.totalRatings,
                location:worker.location.description,
                Verified:worker.isVerified
              }}
              onStartChat={handleStartChat}
            />
          ))
        ) : (
          <p>No workers found</p>
        )}
      </div>
      </div>
    </div>
  );
};

export default Helper;
