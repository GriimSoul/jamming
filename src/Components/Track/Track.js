import React from "react";

import styles from './Track.module.css';



function Track(props) {

function addORRemove() {
    props.addRemove(props.track);
}

    return(
        <article className={styles.sTrack}>
        <img    src={props.track.album.images[1].url}
                alt={props.track.name + " cover image"}
                className={styles.sTrackImage}
         />
        <div className={styles.orderWrapper}>
            <div className={styles.infoContainer}>
                <h3>
                    <a href={props.track.external_urls.spotify}
                        target="_blank"
                        className={styles.songTitle}>
                        {props.track.name}
                    </a>
                </h3>
                <h3 >
                    <a href={props.track.artists[0].external_urls.spotify}
                        target="_blank"
                        className={styles.artistName}>
                        {props.track.artists[0].name}
                    </a>
                </h3>
                <h3>
                    <a href={props.track.album.external_urls.spotify}
                        target="_blank"
                        className={styles.albumName}>
                        {props.track.album.name}
                    </a>
                </h3>
            </div>
            <button className={styles.addRemove}
                    onClick={addORRemove}>
                {props.plusOrMinus}
            </button>
        </div>
        </article>
    )
}

export default Track;