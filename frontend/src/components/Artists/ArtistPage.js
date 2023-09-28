import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink, Navigate } from "react-router-dom";
import { getArtist } from "../../store/artist";
import { getEvents } from "../../store/event";
import { setFavorite, removeFavorite, getFavorites } from "../../store/favorites"
import ArtistEventCard from "./ArtistEventCard";
import styles from "./ArtistPage.module.css";

const ArtistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { artistId } = useParams();
  const user = useSelector(state => state.session.user)
  const artist = useSelector(state => ( state.artists.artist ));
  const favorites = useSelector(state => state.favorites.favorites);
  let events = useSelector(state => state.events.events)
  const [isLoaded, setIsLoaded] = useState(false);  
  events = Object.values(events);
  events = events.filter(event => event.artist.id === parseInt(artistId));

  useEffect(() => {
    dispatch(getArtist(artistId)).then((res) => {
      if (res.errors) {
        navigate("/");
        setIsLoaded(true);
      } else {
        dispatch(getEvents());
        if (user) dispatch(getFavorites(user.id));
        setIsLoaded(true);
      }
    });
  }, [dispatch, artistId, user, navigate]);

  if (!isLoaded) return <div>Loading...</div>;
  const image = artist.images.find(image => image.includes("ARTIST_PAGE"));

  const divStyle = {
    backgroundImage: `url(${image})`
  };

  const handleFavoriteClick = () => {
    if (user) {
      dispatch(setFavorite(artist));
    } else {
      navigate("/login");
    };
  };

  const handleUnfavoriteClick = () => {
    dispatch(removeFavorite(artist));
  };

  const isArtistFavorited = (artistId, favorites = []) => {
    return favorites.some(favorite => favorite.id === artistId);
  };

  const isFavorited = isArtistFavorited(artist.id, favorites);
  const favoriteButtonText = isFavorited ? "Unfavorite" : "Favorite";

  const noEvents = () => { if (events.length) {
    return (
      <div className={styles.artistEventsContainer}>
        <div className={styles.artistEventsSubContainer}>
          <div className={styles.pageInfo}>
            <div className={styles.eventsTitleContainer}>
              <h2 className={styles.eventsTitle}>
                Events - <span className={styles.resultsCount}>{events.length} results</span>
              </h2>
            </div>
          </div>
        </div>
        <div className={styles.eventsContainer}>
          <div className={styles.eventsSubContainer}>
            <div clssName={styles.eventsContent}>
              <div className={styles.eventsList}>
                {events.map(event => (
                  <ArtistEventCard event={event} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.noEventsContainer}>
        <div className={styles.noEventsText}>Sorry, there are no upcoming events.</div>
      </div>
    );
  };
};

  return (
    <div className={styles.artistPageContainer}>
      <div className={styles.artistHeaderContainer}>
        <div className={styles.backgroundImg} style={divStyle}>
        </div>
        <div className={styles.artistHeaderContent}>
          <nav className={styles.navContainer}>
            <ol className={styles.navOL}>
              <li className={styles.navLI}>
                <NavLink className={styles.navlink} to="/">Home /</NavLink>
              </li>
              <li className={styles.slash}></li>
              <li className={styles.navLI}>
                <NavLink className={styles.navlink} to="/events">{artist.classification.name} /</NavLink>
              </li>
              <li className={styles.slash}></li>
              <li className={styles.navLI}>
                {artist.genre.name} /
              </li>
              <li className={styles.slash}></li>
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
              <div className={styles.favoriteContainer}>
                <button className={styles.favoriteButton} onClick={isFavorited ? handleUnfavoriteClick : handleFavoriteClick}>
                  {favoriteButtonText}
                </button>
              </div>
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
      {noEvents()}
    </div>
  );
};

export default ArtistPage;