
import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import SearchBar from './Components/Search Bar/SearchBar';
import Playlist from './Components/Playlist/playlist';
import SearchResults from './Components/Search Results/SearchResults';



function App() {

  const [results, setResults] = useState([]);
  const [pName, setPName] = useState('');
  const [pTracks, setPTracks] = useState([]);
  const [input, setInput] = useState('');

  function handleChange({target}) {
    setInput(target.value);
}

  function searchResults(e) {
    e.preventDefault();

  };

  function addToP(song) {
    setPTracks('')
  };

  function removeFromP(song) {

  };

  function changePName({target}) {
    setPName(target.value);
  };

  function savePlaylist() {

  };

  return (
    <div className="App">
      <SearchBar 
        searchResults={searchResults} 
        input={input} 
        handleChange={handleChange}/>
      <SearchResults results={results} addToP={addToP}/>
      <Playlist 
        pName={pName} 
        pTracks={pTracks} 
        removeFromP={removeFromP} 
        changePName={changePName} />
    </div>
  );
}

export default App;