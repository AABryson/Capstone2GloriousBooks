//Checked
import React, {useContext} from 'react';
import { googleLogout } from '@react-oauth/google';
import ContextObject from './ContextObject'


const GoogleLogoutButton = () => {
  const {setLoggedIn} = useContext(ContextObject)
  const handleLogout = () => {
    googleLogout();
    console.log('Logged out');
    setLoggedIn('')
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default GoogleLogoutButton;
