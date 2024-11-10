import React from "react";

import Track from '../Track/Track';

function Tracklist(props) {



    return (
        <section className="trackList">
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