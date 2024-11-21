import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './SearchResults.module.css';



function SearchResults(props) {

    return (
        <section className={styles.results}>
        <h2>Search Results</h2>
        <Tracklist 
        tracks={props.results} 
        addToP={props.addToP}/>
        </section>
    )

}

export default SearchResults;