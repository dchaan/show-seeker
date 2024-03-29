import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getArtists } from "../../store/artist";
import ArtistCard from "./ArtistCard";
import { RotatingLines } from 'react-loader-spinner';
import styles from "./Artists.module.css";

const ArtistsIndex = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  let artists = useSelector(state => state.artists.artists);
  artists = Object.values(artists);
  
  const [displayedArtists, setDisplayedArtists] = useState(10);
  const batchSize = 10;
  const [sortOption, setSortOption] = useState("date");

  useEffect(() => {
    dispatch(getArtists("music")).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sortedArtists = useMemo(() => {
    const sortedArtists = [...artists];
    
    if (sortOption === "nameAZ") {
      sortedArtists.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "nameZA") {
      sortedArtists.sort((a, b) => b.name.localeCompare(a.name));
    };
    
    return sortedArtists;
  }, [artists, sortOption]);

  if (!isLoaded) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.circle}>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      </div>
    );
  };

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
        {sortedArtists.slice(0, displayedArtists).map(artist => (
          <ArtistCard artist={artist} />
        ))}
      </div>
      <div className={styles.loadMoreContainer}>
        {displayedArtists < artists.length && (
          <div className={styles.loadMoreSubContainer}>
            <button className={styles.loadMoreButton} onClick={() => setDisplayedArtists(prev => prev + batchSize)}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistsIndex;