import React from "react";
import Track from '../Track/Track';
import styles from './Tracklist.module.css';

function Tracklist(props) {



    return (
        <section className={styles.trackList}>
            {console.log(props.tracks)}
            {props.tracks?.map((track) => (
        <Track 
          key={track.id} 
          track={track}
          id={track.id}
          addRemove={props.addToP}
          plusOrMinus="+" 
        />
      ))}
        </section>
    );
}

export default Tracklist;