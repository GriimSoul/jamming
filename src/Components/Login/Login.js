import React, { useState, useEffect } from 'react';
import spotifyLogo from './spotifyLogo.png';
import styles from "./Login.module.css";
import { isAccessTokenValid } from '../../utils/useSpotifyAuth';

const code = localStorage.getItem('access_code');

const LoginButton = (props) => {

  const [logged, setLogged] = useState(false);
  
  useEffect(() => {
    const checkToken = async () => {
      const isValid = await isAccessTokenValid();
      if (isValid) {
        setLogged(true);
      } else {
        // Token is invalid, clear it from localStorage
        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_refresh_token');
        setLogged(false);
      }
    };

    checkToken();
  }, [localStorage.getItem('spotify_access_token')]);

  const handleLogin = () => {
    window.location.href = props.getSpotifyLoginUrl();
  };


  return (
    <section 
    className={styles.headerBar}>
      
        <button 
        onClick={handleLogin}
        className={styles.spotifyButton}>
      <img
          src={spotifyLogo}
          className={styles.spotifyImage}
      alt="spotify logo"/>
      <span className={styles.logIN}>
      {logged ? "" : "Log in to use"}
      </span>
      </button>
    </section>)
};

export default LoginButton;
