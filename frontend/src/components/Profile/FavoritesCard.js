import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { removeFavorite } from "../../store/user"
import styles from "./FavoritesCard.module.css";


const FavoritesCard = ({ artist }) => {
  const image = artist['images'].find(image => image.includes('TABLET_LANDSCAPE_LARGE'));
  const altImage = artist['images'].find(image => image.includes('SOURCE'));
  const dispatch = useDispatch();

  const handleUnfavorite = () => {
    dispatch(removeFavorite(artist));
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardSubContainer}>
        <div className={styles.textContainer}>
          <div className={styles.text}>
            {artist.name}
          </div>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.imageRatio}>
            <div className={styles.imageWrapper}>
              <NavLink className={styles.navlink} to={`/artists/${artist.id}`}>
                <img className={styles.image} src={image} alt={altImage} />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <button className={styles.buttonContainer} onClick={() => handleUnfavorite()}>
        <div className={styles.buttonText}>Unfavorite</div>
      </button>
    </div>
  )
};

export default FavoritesCard;