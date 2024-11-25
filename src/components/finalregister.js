import React, { useEffect, useState } from "react";
import "./finalregister.css";
import I12 from './images/I12.png'
import I13 from './images/I13.png'
import Nav from './fnavbar.js'
import Autocomplete from 'react-google-autocomplete';
const Registration = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: {
      description: '',
      coordinates: [], // [longitude, latitude]
    },
    role: 'customer',
    profession: 'none',
    hourlyRate: 0,
    avatar: null
  });
  const [isWorker, setIsWorker] = useState(false);
  const handleToggle = () => {
    setIsWorker(!isWorker);
  };

  useEffect(() => {
    if (isWorker) {
      setFormData((formData)=>({
        ...formData,
        role: 'worker', 
      }));
    }
    else{
      setFormData((formData)=>({
        ...formData,
        role: 'customer', 
      }));
    }
    //console.log(formData.role);
  },[isWorker])

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };
  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   const dataToSubmit = {
  //     ...formData,
  //     userType: isWorker ? "worker" : "user",
  //   };
  //   console.log("Form Data:", dataToSubmit);
  // };



  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.location.description) {
      alert('Location is required');
      return;
    }
    //console.log("Form Data:", formData);
    onSubmit(formData);
  };
  
  const handlePlaceSelected = (place) => {
    if (place.geometry) {
      const lat = place.geometry.location.lat(); 
      const lng = place.geometry.location.lng(); 
       setFormData( (formData)=>( { ...formData, location: { description: place.formatted_address, coordinates: [lng, lat], }, }));
      // console.log(formData.location.coordinates);
    } else {
      console.error("Place does not have geometry information.");
    }
  };
  return (
    <>
    <Nav/>
    <div className="page-wrapper">
      <div className="auth-container">
        <div className="left-section">
          <img
            src={I12}
            alt="Tasky Logo"
            className="logo"
          />
          <h2 className="form-title poppins-bold">Create Account</h2>

          <div className="toggle-container" onClick={handleToggle}>
            <div
              className={`toggle-switch ${isWorker ? "worker" : ""}`}
              id="userTypeToggle"
            >
              <div className="toggle-labels">
                <span className={`toggle-text ${!isWorker ? "active" : ""}`}>
                  User
                </span>
                <span className={`toggle-text ${isWorker ? "active" : ""}`}>
                  Worker
                </span>
              </div>
            </div>
          </div>

          <form id="registrationForm" className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                className="form-input"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
            <label htmlFor="location" className="form-label">Search for a location
        </label>
        <Autocomplete
        className="form-input"
        autocomplete="off"
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} // Secure your API key
           onPlaceSelected={handlePlaceSelected}
          types={["geocode"]}
          placeholder="Search for a location"
          required
        />
       
         </div>

          
            <div className="form-group">
              <label className="form-label" htmlFor="avatar">
                Profile Image
              </label>
              <input
               type="file"
          id="avatar"
          name="avatar"
         
          onChange={handleInputChange}
        />
              {formData.avatar && (
                <div
                  className="image-preview"
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(formData.avatar)})`,
                  }}
                ></div>
              )}
            </div>
            
              
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {isWorker && (
              <div className="worker-fields" id="workerFields">
                <div className="form-group">
                  <label className="form-label" htmlFor="hourlyRate">
                    Hourly Rate (₹)
                  </label>
                  <input
                    className="form-input"
                    type="number"
                    id="hourlyRate"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="profession">
                    Professional Category
                  </label>
                  <select
                    className="form-select"
                    id="profession"
                    name="profession"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="plumber">Plumber</option>
                    <option value="electrician">Electrician</option>
                    <option value="carpenter">Carpenter</option>
                    <option value="painter">Painter</option>
                    <option value="cleaner">Cleaner</option>
                    <option value="gardener">Gardener</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            )}

            <button className="submit-button" type="submit">
              Register
            </button>
          </form>
        </div>

        <div className="right-section">
          <img
            src={I13}
            alt="Illustration"
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default Registration;
