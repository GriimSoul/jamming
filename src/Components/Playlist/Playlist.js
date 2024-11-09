import React from "react";

import Track from "../Track/Track";

function Playlist(props) {


    return (
        <section className="playlist">
            <form>
                <input 
                    type="text" 
                    name="playlistTitle" 
                    placeholder="My cool playlist" 
                    value={props.pName} 
                    onChange={props.changePName}/>

                <div className="playlistTracks">
                { props.pTracks.map((track) => {
                        return (
                            <Track
                            key={track.id}
                            track={track}
                            addRemove={props.removefromP}
                            plusOrMinus="-"/>
                        )
                    })
                }
                </div>

                <button onClick={props.savePlaylist}>Save Playlist</button>
            </form>
        </section>
    )
}

export default Playlist;