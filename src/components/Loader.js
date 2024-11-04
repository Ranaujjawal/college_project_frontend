import React from 'react';
import './Loader.css';

const ProfessionalLoader = () => {
  return (
    <div className='loadbody'>
    <div className="loader-container">
      <div className="loader">
        <svg className="progress-ring" width="80" height="80">
          <circle className="bg" cx="38" cy="38" r="36"></circle>
          <circle className="progress" cx="38" cy="38" r="36"></circle>
        </svg>
        <div className="loader-circle"></div>
        <div className="loader-inner"></div>
      </div>
      <div className="loading-text">Loading</div>
    </div>
    </div>
  );
};

export default ProfessionalLoader;
