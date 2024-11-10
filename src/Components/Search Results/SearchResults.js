import React from 'react';

import Tracklist from '../Tracklist/Tracklist';



function SearchResults(props) {

    return (
        <section className='results'>
        <h2>Search Results</h2>
        <Tracklist 
        tracks={props.results} 
        addToP={props.addToP}/>
        </section>
    )

}

export default SearchResults;