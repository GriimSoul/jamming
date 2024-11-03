import React from "react";

import './Track.module.css';



function Track(props) {

function addORRemove() {
    props.addRemove(props.track);
}

    return(
        <article className="sTrack">
        <img src="image source" alt="{title} image"/>
        <h3 className="songTitle">Title</h3>
        <h3 className="artistName">by: Artist</h3>
        <h3 className="albumName">Album</h3>

        <button className="addRemove" onClick={addORRemove}>{props.plusOrMinus}</button>
        <hr/>
        </article>
    )
}

export default Track;