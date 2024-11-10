import React, {useState, useEffect} from 'react';

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

  return (
  <button 
  onClick={handleLogin}>
    <img 
    src="spotify logo.png"
    alt="spotify logo"/>
    {logged ? "" : "Log in to use"}
    </button>);
};

export default LoginButton;
