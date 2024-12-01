import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader.js'
import './Profile.css'
const Profile = () => {
  const navigate = useNavigate();
  const [document1, setDocument1] = useState(null);
  const [document2, setDocument2] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState('None');
  const [remarks, setRemarks] = useState('');
  const [isloading, setIsloading] = useState(false);
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
  axios.defaults.withCredentials = true;

  // Fetch the verification status on component mount
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setIsloading(true)
        const response = await axios.get('/admin/aworkers'); // Adjust this endpoint based on your backend
        setVerificationStatus(response.data.status);
        setRemarks(response.data.remarks || '');
        setIsloading(false)
      } catch (error) {
        setIsloading(false)
        console.error('Error fetching document status:', error);
      }
    };
    fetchStatus();
  }, []);

  // Handle logout logic
  const handleLogout = async () => {
    try {
      setIsloading(true)
      const response = await axios.post('/auth/logout');
      if (response.data.success) {
        alert('Logout successful');
        navigate('/');
      } else {
        alert('Something went wrong.');
      }
      setIsloading(false)
    } catch (error) {
      setIsloading(false)
      alert('Logout failed.');
    }
  };

  // Handle document submission
  const handleDocumentSubmit = async (e) => {
    e.preventDefault();

    if (!document1 || !document2) {
      alert('Please upload both documents.');
      return;
    }

    const formData = new FormData();
    formData.append('document1', document1);
    formData.append('document2', document2);
    formData.append('documentname1','AADHAR');
    formData.append('documentname2','IMAGE')
    try {
      setIsloading(true)
      const response = await axios.post('/admin/asubmit-documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        alert('Documents submitted successfully.');
        setVerificationStatus('Pending');
      } else {
        alert('Failed to submit documents.');
      }
      setIsloading(false)
    } catch (error) {
      setIsloading(false)
      console.error('Error submitting documents:', error);
      alert('Error submitting documents.');
    }
  };
if(isloading){
  return(<>
  <Loader/>
  </>)
}
  return (
    <div className="profile-container">
      <h2 className='profilehead'>Profile</h2>
      <p className='profilewelcome'>Welcome to your profile!</p>

      <h3 className='profiledocumentstat'>Document Verification Status: {verificationStatus}</h3>
      {remarks && <p><strong>Remarks:</strong> {remarks}</p>}

      {verificationStatus === 'None' || verificationStatus === 'Rejected' ? (
        <form onSubmit={handleDocumentSubmit}>
          <label>
            Upload AADHAR FRONT IMAGE(Image or PDF):
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setDocument1(e.target.files[0])}
              className='profileaadhar'
            />
          </label>
          <br />
          <label>
            Upload Your IMAGE FRONT FACING (Image or PDF):
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setDocument2(e.target.files[0])}
              className='profileself'
            />
          </label>
          <br />
          <button type="submit" className='profiledocumentsubmit'>Submit Documents</button>
        </form>
      ) : verificationStatus === 'Pending' ? (
        <p className='profilestatus'>Your documents are under review.</p>
      ) : verificationStatus === 'Verified' ? (
        <p className='profilestatus'>Your documents have been verified.</p>
      ) : null}

      <button onClick={handleLogout} className='profilelogoutbutton'>
        Logout
      </button>
    </div>
  );
};


export default Profile;
