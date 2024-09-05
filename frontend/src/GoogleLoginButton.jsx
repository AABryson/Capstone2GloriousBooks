//Checked
import React, {useContext} from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import ContextObject from './ContextObject'


const GoogleLoginButton = () => {
  const {authToken, setAuthToken} = useContext(ContextObject);
  const{setLoggedIn} = useContext(ContextObject)
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    //added from chatgpt
    scope: 'https://www.googleapis.com/auth/books',
    onSuccess: async (codeResponse) => {
      try {
        // Exchange the authorization code for tokens with backend
        const response = await axios.post('https://capstone2gloriousbooks.onrender.com/auth/google', {
          code: codeResponse.code,
        });
        // Handle the tokens received from backend and store in authToken state
        setAuthToken(response.data.access_token);
        setLoggedIn('true')
      } catch (error) {
        console.error('Error exchanging code for tokens:', error);
      }
    },
    onError: errorResponse => console.error('Login Error:', errorResponse),
  });
  

  return (
    <button onClick={() => googleLogin()}>
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;