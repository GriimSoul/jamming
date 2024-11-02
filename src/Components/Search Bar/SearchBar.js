import React, {useState} from 'react';

function SearchBar(props) {


    return (
        <section className="searchBar">
                <input 
                    type="search" 
                    name="search" 
                    value={props.input} 
                    placeholder='Search for a song or artist' 
                    onChange={props.handleChange}/>
                <button  onClick={props.searchResults} >&#x1F50E;</button>
        </section>
    )
}

export default SearchBar;