import React from 'react';
import './about.css';
import Footer from './footer.js'
import Navbar from './navbar.js';
const AboutPage = () => {
  const students = [
    {
      name: 'Ujjawal',
      bio: 'Ujjawal is a software engineering student with a passion for web development. She loves creating responsive and user-friendly interfaces.',
      image: 'https://via.placeholder.com/150', // Replace with actual image URLs
    },
    {
      name: 'Vinita',
      bio: 'Vinita is a software engineering student with a passion for web development. She loves creating responsive and user-friendly interfaces.',
      image: 'https://via.placeholder.com/150', // Replace with actual image URLs
    },
    {
      name: 'Deepanshi',
      bio: 'Deepanshi is a software engineering student with a passion for web development. She loves creating responsive and user-friendly interfaces.',
      image: 'https://via.placeholder.com/150', // Replace with actual image URLs
    },
  ];

  return (
    <>
    <Navbar/>
    <div className='outerbox'>
    <div className='outerboxpaddingtop'></div>
    <div className="about-container">
      <h1 className="about-title">About the Group</h1>
      <div className="student-list">
        {students.map((student, index) => (
          <div key={index} className="student-card">
            <img src={student.image} alt={student.name} className="student-image" />
            <h2 className="student-name">{student.name}</h2>
            <p className="student-bio">{student.bio}</p>
          </div>
        ))}
      </div>
    </div>
    <div className='outerboxpaddingbot'></div>
    </div>
    <Footer/>
    </>
  );
};

export default AboutPage;
