import React, { useState,useEffect } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import AutocompleteSearchBar from "./googleautocompletesearch.js";
import './register.css'
import { useNavigate } from 'react-router-dom';
// Registration Form Component
import Footer from './footer.js'
import Navbar from './navbar.js';
import Bot from './chatbot.js'
import Autocomplete from 'react-google-autocomplete';
const RegistrationForm = ({ onSubmit }) => {
  // useEffect(()=>{
  //   console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
  // },[])
   const navigate = useNavigate();
   const [query, setQuery] = useState('');
   const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: {
      description: '',
      coordinates: [], // [longitude, latitude]
    },
    role: '',
    profession: '',
    hourlyRate: '',
    avatar: null
  });
  const[temp,setTemp]=useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input change
  
  const handlePlaceSelected1 = (place) => {
    if (place.geometry) {
      const { lat, lng } = place.geometry.location;
      setFormData({
        ...formData,
        location: {
          description: place.formatted_address,
          coordinates: [lng(), lat()],
        },
      });
    }
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    //console.log(formData.location)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.location || !formData.password || !formData.role || !formData.profession || !formData.hourlyRate) {
      setError('Please fill in all required fields');
      return;
    }
   
   

    onSubmit(formData);
  };
  const handleLoginclick = () =>
  {
    navigate('/login');
  }



  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      // Define the request options if needed (e.g., search radius, types)
    },
    debounce: 300
  });

  // Handle clicking outside the component to clear suggestions
  const registerRef = useOnclickOutside(() => {
    clearSuggestions();
  });

  // Handle input change
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  // Handle selecting a location from suggestions
  const handleSelect = ({ description }) => () => {
    setValue(description, false);  // Set the value without triggering API request
    clearSuggestions();

    // Get latitude and longitude using the description of the location
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        // Update the form data with the selected location and coordinates
        setFormData({
          ...formData,
          location: {
            description,
            coordinates: [lng, lat],
          },
        });
      })
      .catch((error) => {
        console.error('Error fetching location data:', error);
      });
  };

  // Render the location suggestions
  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion;

      return (
        <li key={id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });



    const handlePlaceSelected = (place) => {
      console.log("hello",place);
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
  
        setFormData({
          ...formData,
          location: {
            description: place.formatted_address,
            coordinates: [lng, lat],
          },})
  
        // console.log("Selected Place Details:");
        // console.log("Description:", place.formatted_address);
        // console.log("Latitude:", lat);
        // console.log("Longitude:", lng);
      } else {
        console.error("Place does not have geometry information.");
      }
    };

 const handlelChange =(place)=>{
  if (place.geometry) {
    const { lat, lng } = place.geometry.location;
    setFormData({
      ...formData,
      location: {
        description: place.formatted_address,
        coordinates: [lng(), lat()],
      },
    });
  }
 }

  return (
    <>
    <Bot/>
    <Navbar/>
    <div className='outerbox'>
    <div className='outerboxpaddingtop'></div>
    <div className="register-container">
  <form onSubmit={handleSubmit} className="register-form">
    <h2>Register</h2>

    {error && <div className="error">{error}</div>}

    <div className="floating-label">
      <input
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder=" "
        className="input-field"
      />
      <label htmlFor="name" className="input-label">Name</label>
    </div>

    <div className="floating-label">
      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder=" "
        className="input-field"
      />
      <label htmlFor="email" className="input-label">Email</label>
    </div>

    {/* <div className="floating-label">
      <input
        id="location"
        name="location"
        type="text"
        value={formData.location}
        onChange={handleChange}
        placeholder=" "
        className="input-field"
      />
      <label htmlFor="location" className="input-label">Location</label>
    </div> */}
     {/* <div ref={registerRef} className="floating-label">
      <label htmlFor="location" className="input-label">
        Location
      </label>
      <Autocomplete
  apiKey="AIzaSyC6VYEnz1UFeEkPDPNi8p_XHFuipQLnCN0"
  onPlaceSelected={(place) => {
    console.log(place);
  }}
  onChange={handleInputChange}
  value={value}
  className="input-field"
/> */}
      {/* <input
        type="text"
        id="location"
        name="location"
        value={value}
        onChange={handleInputChange}
        disabled={!ready}
        placeholder="Search for a location"
        className="input-field"
      /> */}
      {/* Display the suggestion list if status is OK */}
      {/* {status === 'OK' && <ul className="suggestions-dropdown">{renderSuggestions()}</ul>}
      <small className="hint">
        {formData.location.description ? `Selected: ${formData.location.description}` : 'Search to select a location'}
      </small> */}
    {/* </div> */}
    <div className="floating-label">
        <label htmlFor="location" className="input-label">
        </label>
        <Autocomplete
          apiKey="" // Secure your API key
           onPlaceSelected={handlePlaceSelected}
          value={temp}
          onChange={handlelChange}
          types={["geocode"]}
          // fields={["geometry", "formatted_address"]}
          placeholder="Search for a location"
          className="input-field"
        />
        <small className="hint">
          {formData.location.description
            ? `Selected: ${formData.location.description}`
            : "Search to select a location"}
        </small>
      </div>
      {/* <div className="form-group">
        <label htmlFor="location">Location</label>
        <AutocompleteSearchBar formData={formData} setFormData={setFormData} />
        <small className="hint">
          {formData.location.description
            ? `Selected: ${formData.location.description}`
            : "Start typing to search for a location"}
        </small>
      </div> */}
    <div className="floating-label">
      <input
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder=" "
        className="input-field"
      />
      <label htmlFor="password" className="input-label">Password</label>
    </div>

    <div className="floating-label">
      <select
        id="role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="input-field"
      >
        <option value="" disabled>Select a role</option>
        <option value="customer">Customer</option>
        <option value="worker">Worker</option>
      </select>
      <label htmlFor="role" className="input-label"></label>
    </div>

    <div className="floating-label">
      <select
        id="profession"
        name="profession"
        value={formData.profession}
        onChange={handleChange}
        className="input-field"
      >
        <option value="" disabled>Select a profession</option>
        <option value="none">None</option>
        <option value="plumber">Plumber</option>
        <option value="electrician">Electrician</option>
        <option value="carpenter">Carpenter</option>
        <option value="painter">Painter</option>
        <option value="cleaner">Cleaner</option>
        <option value="gardener">Gardener</option>
        <option value="other">Other</option>
      </select>
      <label htmlFor="profession" className="input-label"></label>
    </div>

    <div className="floating-label">
      <input
        id="hourlyRate"
        name="hourlyRate"
        type="text"
        value={formData.hourlyRate}
        onChange={handleChange}
        placeholder=" "
        className="input-field"
      />
      <label htmlFor="hourlyRate" className="input-label">Hourly Rate</label>
    </div>

    <div className="file-upload floating-label">
      <label htmlFor="avatar" className="input-label"></label>
      <div>
        <input
          id="avatar"
          name="avatar"
          type="file"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <button
          type="button"
          onClick={() => document.getElementById('avatar').click()}
          className="input-field"
        >
          {formData.avatar ? formData.avatar.name : 'Choose File'}
        </button>
      </div>
    </div>

    <button type="submit" className="submit-button2">Register</button>

    <div className="login-section">
      <p className="login-text">Already a user?</p>
      <button type="button" className="login-button2" onClick={handleLoginclick}>Login</button>
    </div>
  </form>
</div>
<div className='outerboxpaddingbot'></div>
</div>
<Footer/>
</>
  );
  
};

export default RegistrationForm;
