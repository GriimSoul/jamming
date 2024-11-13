import React, { useState, useEffect } from 'react';
import spotifyLogo from './spotifyLogo.png'

const code = localStorage.getItem('access_code');

const LoginButton = (props) => {

  const [logged, setLogged] = useState(false);
  
  useEffect(() => { try {
    if (code !== "") {
            setLogged(true);
          } else {
            console.error("fail");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }, []);

  const handleLogin = () => {
    window.location.href = props.getSpotifyLoginUrl();
  };

  const spotifyButton = {
    width: '70px',
    height: '70px',
  }

  return (
  <button 
  onClick={handleLogin}>
    <img 
        src={spotifyLogo}
        style={spotifyButton}
    alt="spotify logo"/>
    {logged ? "" : "Log in to use"}
    </button>);
};

export default LoginButton;
