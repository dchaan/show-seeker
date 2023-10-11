import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFavorites } from "../../store/favorites";
import styles from "./Favorites.module.css";
import FavoritesCard from "./FavoritesCard";

const Favorites = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  const userId = useParams();
  const favorites = useSelector(state => state.favorites.favorites);

  useEffect(() => {
    dispatch(getFavorites(userId.userId)).then(() => setIsLoaded(true))
  }, [dispatch, userId]);

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className={styles.main}>
      <div className={styles.favoritesContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.titleTextContainer}>
            <div className={styles.titleText}>
              My Favorites
            </div>
          </div>
        </div>
        <div className={styles.contentContainer}>
          {favorites.map(favorite => (
            <FavoritesCard artist={favorite} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;