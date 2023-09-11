import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Artists.module.css";
import { getArtists } from "../../store/artist";
import ArtistCard from "./ArtistCard";

const ArtistsIndex = () => {
  let artists = useSelector(state => state.artists.artists);
  artists = Object.values(artists);

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayedEvents, setDisplayedEvents] = useState(10);
  const batchSize = 10;
  const [sortOption, setSortOption] = useState("date");

  useEffect(() => {
    dispatch(getArtists()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return <div>Loading...</div>;

  let filteredArtists = artists.filter(artist => artist.classification.name === "Music");

  const sortArtists = () => {
    const sortedArtists = [...filteredArtists];

    if (sortOption === "nameAZ") {
      sortedArtists.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (sortOption === "nameZA") {
      sortedArtists.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return sortedArtists;
  };

  const sortedArtists = sortArtists();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subHeader}>
        <div className={styles.subHeaderContainer}>
          <div className={styles.homeContainer}>
              <div className={styles.homeTextContainer}>
                <NavLink className={styles.homeLink} to="/">Home</NavLink>
                <div className={styles.slash}>
                  /
                </div>
                <div className={styles.subTitle}>Artists</div>
              </div>
          </div>
          <div className={styles.subHeaderTitle}>
            <h1 className={styles.subHeaderTitleText}>
              <span className={styles.artistText}>Artists</span>
            </h1>
          </div>
        </div>
      </div>
      <div className={styles.artistsContainer}>
        <div className={styles.artistTitleContainer}>
          <div className={styles.allArtistsText}>All Artists ({artists.length})</div>
        </div>
        <div className={styles.filterContainer}>
          <div className={styles.filterSubContainer}>
            <select className={styles.filterBox} value={sortOption} onChange={e => setSortOption(e.target.value)}>
              <option value="nameAZ">Sort By Name A-Z</option>
              <option value="nameZA">Sort By Name Z-A</option>
            </select>
          </div>
        </div>
        {sortedArtists.slice(0, displayedEvents).map(artist => (
          <ArtistCard artist={artist} />
        ))}
      </div>
      <div className={styles.loadMoreContainer}>
        {displayedEvents < artists.length && (
          <div className={styles.loadMoreSubContainer}>
            <button className={styles.loadMoreButton} onClick={() => setDisplayedEvents(prev => prev + batchSize)}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistsIndex;