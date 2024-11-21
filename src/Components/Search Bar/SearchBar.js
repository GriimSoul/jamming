import React, {useState} from 'react';
import styles from './SearchBar.module.css';

function SearchBar(props) {


    return (
        <section className={styles.SearchBar}>
                <input 
                    type="search"
                    className={styles.input} 
                    name="search" 
                    value={props.input} 
                    placeholder='Search for a song or artist' 
                    onChange={props.handleChange}/>
                <button  onClick={props.searchResults} 
                        className={styles.searchButton}>&#x1F50E;</button>
        </section>
    )
}

export default SearchBar;