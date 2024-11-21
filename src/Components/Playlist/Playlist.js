import React from "react";
import Track from "../Track/Track";
import styles from "./playlist.module.css";

function Playlist(props) {


    return (
        <section className={styles.playlist}>
            <form>
                <div className={styles.playlistHeader}>
                    <input
                        type="text"
                        name="playlistTitle"
                        placeholder="My cool playlist"
                        value={props.pName}
                        onChange={props.changePName}
                        className={styles.playlistName}/>
                    <div className={styles.privacyCollection}>
                        <label htmlFor="isPrivate"
                            className={styles.toggleLabel}>
                            {props.pubPriv ? "Private" : "Public"}
                        </label>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                name="isPrivate"
                                id="isPrivate"
                                className={styles.toggleButton}
                                onChange={props.checkPrivacy}
                                />
                            <span className={styles.sliderRound}></span>
                        </label>
                    </div>
                </div>

                <div className={styles.playlistTracks}>
                { props.pTracks.map((track) => {
                        return (
                            <Track
                            key={track.id}
                            track={track}
                            addRemove={props.removeFromP}
                            plusOrMinus="-"/>
                        )
                    })
                }
                </div>

                <button onClick={props.savePlaylist}
                        className={styles.savePlaylist}>
                    Save Playlist
                </button>
            </form>
        </section>
    )
}

export default Playlist;