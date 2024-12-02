import React, { useState } from 'react';
import axios from 'axios';
import {  Filter, X } from 'lucide-react';
import Autocomplete from 'react-google-autocomplete';
import './filter.css'
const WorkerFilter = ({ onSubmit}) => {
    axios.defaults.baseURL =process.env.REACT_APP_BACKEND_URL;
    axios.defaults.withCredentials = true;
  const [isOpen, setIsOpen] = useState(false);
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
  
  const [tempFilters, setTempFilters] = useState({...filters});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempFilters((prev) => ({ ...prev, [name]: value }));
    //console.log(name,value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(tempFilters);
    const appliedFilterss = Object.entries(tempFilters).reduce((acc, [key, value]) => {
     
      if (value !== '' && value !== null && (Array.isArray(value) ? value.length > 0 : true)) {
        
        if (key === 'location' && value.description !== '') {
          acc[key] = { description: value.description };
        } else if (key !== 'location') {
          acc[key] = value;
        }
      }
      return acc;
    }, {});
    try {
        const response = await axios.post('/auth/workers', {
        params: tempFilters,
      });
      //console.log(response.data)
      const FilteredData =response.data.workers
      setFilters({...tempFilters});
      onSubmit(FilteredData,appliedFilterss);
      
      setIsOpen(false);
    } catch (error) {
      console.error('Error fetching workers:', error);
      alert('Failed to fetch workers. Please try again.');
    }
  };

  const handleReset = () => {
    setTempFilters({
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
  };
  const handlePlaceSelected = (place) => {
    if (place.geometry) {
      const lat = place.geometry.location.lat(); 
      const lng = place.geometry.location.lng(); 
      setTempFilters( (tempFilters)=>( { ...tempFilters, location: { description: place.formatted_address, coordinates: [lng, lat], }, }));
       //console.log(formData.location.coordinates);
    } else {
      console.error("Place does not have geometry information.");
    }
  };
  return (
    <div className="relative w-full max-w-md mx-auto">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center f-L w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition marg"
      >
        {isOpen ? (
          <>
            <X className="mr-2" size={20} /> Filter Services
          </>
        ) : (
          <>
            <Filter className="mr-2" size={20} /> Filter Services
          </>
        )}
      </button>

      {isOpen && (
        <form 
          onSubmit={handleSubmit} 
          className="absolute z-10 w-full bg-white shadow-lg rounded-md p-4 mt-2 min-w border"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <Autocomplete
        className="form-input"
        autocomplete="off"
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} // Secure your API key
           onPlaceSelected={handlePlaceSelected}
          types={["geocode"]}
          placeholder="Search for a location"
         
        />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Minimum Rating</label>
              <input
                type="number"
                name="minRating"
                value={tempFilters.minRating}
                onChange={handleInputChange}
                min="0"
                max="5"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="e.g., 4"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Maximum Price (Hourly)</label>
              <input
                type="number"
                name="maxPrice"
                value={tempFilters.maxPrice}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="e.g., 50"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Profession</label>
              <select
                name="profession"
                value={tempFilters.profession}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="">Select Profession</option>
                    <option value="plumber">Plumber</option>
                    <option value="electrician">Electrician</option>
                    <option value="carpenter">Carpenter</option>
                    <option value="painter">Painter</option>
                    <option value="cleaner">Cleaner</option>
                    <option value="gardener">Gardener</option>
                    <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Sort By</label>
              <select
                name="sortBy"
                value={tempFilters.sortBy}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="">Default</option>
                <option value="rating">Rating</option>
                <option value="price_low">Price (Low to High)</option>
                <option value="price_high">Price (High to Low)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mr-2">Radius</label>
              <select
                name="radius"
                value={tempFilters.radius}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="">Select Value</option>
                <option value="5">5 km</option>
                <option value="10">10 km</option>
                <option value="15">15 km</option>
                <option value="20">20 km</option>
                <option value="30">30 km</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <button 
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Reset Filters
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Apply Filters
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default WorkerFilter;