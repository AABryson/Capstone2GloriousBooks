//checked
import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ContextObject from './ContextObject';

const Callback = () => {
  const {loggedIn, setLoggedIn} = useContext(ContextObject)
  const location = useLocation();
  useEffect(() => {
    // Extract authorization code from query params
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    // Send code to backend for tokens
    if (code) {
      axios.post('https://capstone2gloriousbooks.onrender.com/auth/google', { code })
        .then(response => {
          // Handle tokens, save them, etc.
          console.log('Tokens:', response.data);
        })
        .catch(error => {
          console.error('Error exchanging code for tokens:', error);
        });
    }
    setLoggedIn('true')
  }, [location]);

  
  

  return <div>Loading...</div>;
};

export default Callback;
