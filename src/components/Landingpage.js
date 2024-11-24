import React from 'react';
 import './Landingpage.css';
import { useNavigate } from 'react-router-dom';
import Footer from './footer.js'
import Navbar from './navbar.js';
import Bot from './chatbot.js'
const WelcomeComponent = () => {
    const navigate = useNavigate();
    const handlelogin = () =>
    {
        navigate('/login');
    }
    const handleregister = () =>
    {
        navigate('/register');
    }
    return (
        <>
        <Bot/>
        <Navbar/>
         <div className="container1">
            <div className="content-box1">
                <h1 className="title1">Welcome to Platform</h1>
                <p className="subtitle1">
                    Join thousands of users who trust our platform for their daily needs. Get started today!
                </p>
                <div className="button-container1">
                    <button className="btn1 btn-primary1" onClick={handleregister}>Sign Up</button>
                    <button className="btn1 btn-secondary1" onClick={handlelogin}>Login</button>
                </div>
            </div>
        </div>
    <Footer/>
    </>
        );
};

export default WelcomeComponent;
