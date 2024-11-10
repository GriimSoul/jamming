import React from "react";

import './Track.module.css';



function Track(props) {

function addORRemove() {
    props.addRemove(props.track);
}

    return(
        <article className="sTrack">
        <img src={props.track.album.images[1].url} alt={props.track.name + " cover image"}/>
        <h3 className="songTitle">
            <a href={props.track.external_urls.spotify} target="_blank">
                {props.track.name}
            </a>
        </h3>
        <h3 className="artistName">
            <a href={props.track.artists[0].external_urls.spotify} target="_blank">
                {props.track.artists[0].name}
            </a>
        </h3>
        <h3 className="albumName">
            <a href={props.track.album.external_urls.spotify} target="_blank">
                {props.track.album.name}
            </a>
        </h3>

        <button className="addRemove" onClick={addORRemove}>{props.plusOrMinus}</button>
        <hr/>
        </article>
    )
}

export default Track;