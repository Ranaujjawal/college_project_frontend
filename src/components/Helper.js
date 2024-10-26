import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from './usercard'; // Import the UserCard component
import { useNavigate  } from 'react-router-dom';
const Helper = () => {
  axios.defaults.baseURL = 'http://localhost:4040';
  axios.defaults.withCredentials = true;
 const navigate = useNavigate ();
  const [workers, setWorkers] = useState([]); // State to hold workers data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to handle errors
  const [searchTerm, setSearchTerm] = useState(''); // State to track search input

  // Fetch workers based on the search query
  const fetchWorkers = async (queryParams = {}) => {
    try {
      const response = await axios.post('/auth/workers', queryParams); // Pass query params
      const workerdata = response.data.workers;
      setWorkers(workerdata); // Set the fetched workers data
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching workers:', error);
      setError('Failed to fetch workers'); // Set error state
      setLoading(false); // Set loading to false in case of error
    }
  };

  // Handle input change in the search bar
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue); // Update the search term state

    // Fetch workers with the search term (querying by name or profession)
    const queryParams = { profession: searchValue };
    fetchWorkers(queryParams);
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

  return (
    <div className="helper-container">
      <h2>Helper</h2>
      <p>Find helpers or assistants here.</p>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by profession"
        value={searchTerm} // Bind the input field to the searchTerm state
        onChange={handleSearchChange} // Fetch workers on input change
        className="search-bar"
      />

      {/* Workers listing */}
      <div className="user-cards-container">
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
              }}
              onStartChat={handleStartChat}
            />
          ))
        ) : (
          <p>No workers found</p>
        )}
      </div>
    </div>
  );
};

export default Helper;
