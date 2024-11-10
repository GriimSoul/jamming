
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import SearchBar from './Components/Search Bar/SearchBar';
import Playlist from './Components/Playlist/Playlist';
import SearchResults from './Components/Search Results/SearchResults';
import Login from "./Components/Login/Login"
import {spotifyCallback, getAccessToken, searchSpotify, getSpotifyLoginUrl, code, exchangeCodeForToken} from './utils/useSpotifyAuth';



function App() {

  const [results, setResults] = useState([]);
  const [pName, setPName] = useState('');
  const [pTracks, setPTracks] = useState([]);
  const [input, setInput] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const loc = useLocation();
  const toMakeitSimple = loc.search;

  useEffect(() => {
    if (!code) {
    spotifyCallback(loc);
  }
  },[toMakeitSimple]);


  function handleChange({target}) {
    setInput(target.value);
}

  function searchResults(e) {
    e.preventDefault();
    exchangeCodeForToken();
    const momentaryToken = getAccessToken();
    const fetchResults = async () => {
      const results = await searchSpotify(input, momentaryToken);
      setResults(results); 
    };
  
    fetchResults();
  };

  function addToP(song) {
    if (pTracks.some((tune) => tune.id === song.id)) {
      return
    }
    else {
    setPTracks((prev) => [...prev, song]);
  }
  };

  function removeFromP(song) {
    setPTracks((prev) => 
      prev.filter((tune) => tune.id !== song.id)
    );
  };
  

  function changePName({target}) {
    setPName(target.value);
  };

  function checkPrivacy() {
    setIsPrivate(!isPrivate);
  }

  function savePlaylist() {
    exchangeCodeForToken();
    const momentaryToken = getAccessToken();

    savePlaylist(isPrivate, pName, pTracks, momentaryToken);

    setPTracks([]);
    
  };

  return (
    <div className="App">

      <Login 
      getSpotifyLoginUrl={getSpotifyLoginUrl}
      code={code}/>

      <SearchBar 
        searchResults={searchResults} 
        input={input} 
        handleChange={handleChange}/>

      <SearchResults 
      results={results} 
      addToP={addToP}/>

      <Playlist 
        pName={pName} 
        pTracks={pTracks} 
        removeFromP={removeFromP} 
        changePName={changePName} 
        savePlaylist={savePlaylist}
        checkPrivacy={checkPrivacy}
        pubPriv={isPrivate}/>

    </div>
  );
}

export default App;
