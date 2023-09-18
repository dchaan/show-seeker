import { NavLink } from "react-router-dom";
import music from "../../assets/music.jpg";
import sports from "../../assets/sports.jpg";
import film from "../../assets/film.jpg";
import arts from "../../assets/arts.jpg";
import styles from "./Card.module.css";

const Card = ({ item }) => {

  const categoryImages = {
    "Music": music,
    "Sports": sports,
    "Film": film,
    "Arts & Theatre": arts
  };

  const categoryImage = categoryImages[item.name]

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardSubContainer}>
        <div className={styles.gridContainer}>
          <div className={styles.textContainer}>
            <div className={styles.text}>
              {item.name}
            </div>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageRatio}>
              <div className={styles.imageWrapper}>
                <img className={styles.image} src={categoryImage} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;