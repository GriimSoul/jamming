import React, {useState} from 'react';

const LoginButton = (props) => {

  const [logged, setLogged] = useState(false);

  if (props.code) {
    setLogged(true);
  }

  const handleLogin = () => {
    window.location.href = props.getSpotifyLoginUrl();
  };

  return <button onClick={handleLogin}><img src="/spotify logo.png" alt="spotify logo"/>{logged ? "" : "Log in to use"}</button>;
};

export default LoginButton;
