import React from "react";

import Track from '../Track/Track';

function Tracklist(props) {



    return (
        <section className="trackList">
            {props.tracks.map( (track) => {
                return (<Track 
                track={track}
                id={track.id}
                addRemove={props.addToP}
                plusOrMinus="+"
                /> )
                }
            )}
        </section>
    );
}

export default Tracklist;