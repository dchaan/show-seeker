import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { getArtist } from "../../store/artist";
import { getEvents } from "../../store/event";
import styles from "./ArtistPage.module.css";

const ArtistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { artistId } = useParams();
  const artist = useSelector(state => ( state.artists.artist ));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getArtist(artistId)).then(res => {
      res.errors ? navigate('/') : setIsLoaded(true);
    });
  }, [dispatch, artistId, navigate]);

  if (!isLoaded) return <div>Loading...</div>;
  const image = artist['images'].find(image => image.includes('ARTIST_PAGE'));

  return (
    <div className={styles.artistPageContainer}>
      <div className={styles.artistHeaderContainer}>
        <div className={styles.artistHeaderContent}>
          <nav className={styles.navContainer}>
            <ol className={styles.navOL}>
              <li className={styles.navLI}>
                <NavLink className={styles.navlink} to="/">Home</NavLink>
              </li>
              <li className={styles.slash}>/</li>
              <li className={styles.navLI}>
                <NavLink className={styles.navlink} to="/events">{artist.classification.name}</NavLink>
              </li>
              <li className={styles.slash}>/</li>
              <li className={styles.navLI}>
                {artist.genre.name}
              </li>
              <li className={styles.slash}>/</li>
              <li className={styles.navLI}>
                {artist.name} Tickets
              </li>
            </ol>
          </nav>
          <div className={styles.artistTitleContainer}>
            <img className={styles.artistImage} src={image} alt="" />
            <div className={styles.artistTitleContent}>
              <p className={styles.genre}>{artist.genre.name}</p>
              <h1 className={styles.artistName}>{artist.name}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.barContainer}>
        <div className={styles.barSubContainer}>
          <nav className={styles.navbarBarContainer}>
            <div className={styles.barContentContainer}>
              <ul className={styles.barUL}>
                <li className={styles.barLI}>Events</li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className={styles.artistEventsContainer}>
        <div className={styles.artistEventsSubContainer}>
          <div className={styles.pageInfo}>
            <div className={styles.eventsTitleContainer}>
              <h2 className={styles.eventsTitle}>
                Events  
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ArtistPage;