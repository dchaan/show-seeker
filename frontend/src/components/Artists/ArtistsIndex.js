import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Artist.module.css";
import { getArtists } from "../../store/artist";

const ArtistsIndex = () => {
  let artists = useSelector(state => state.artists.artists);
  artists = Object.values(artists);

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getArtists()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={styles.artistsIndexContainer}>
      {console.log(artists)}
    </div>
  );
};

export default ArtistsIndex;