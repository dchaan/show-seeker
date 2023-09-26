import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Genres.module.css";
import { getGenres } from "../../store/genre";

const GenresIndex = () => {
  let genres = useSelector(state => state.genres.genres);
  genres = Object.values(genres);

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getGenres()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={styles.genresIndexContainer}>
    </div>
  )
};

export default GenresIndex