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

  const categories = ['Music', 'Sports', 'Film', 'Arts & Theatre', 'Miscellaneous' ]

  let image = ""
  image = (item['images']) ? 
    item['images'].find(image => image.includes('TABLET_LANDSCAPE_LARGE'))
    || item['images'].find(image => image.includes('SOURCE')) : categoryImages[item.name]

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardSubContainer}>
        <div className={styles.textContainer}>
          <div className={styles.text}>
            {item.name}
          </div>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.imageRatio}>
            <div className={styles.imageWrapper}>
              {categories.includes(item.name) ? 
                <img className={styles.image} src={image} alt="" /> : 
                  <NavLink className={styles.navlink} to={`/artists/${item.id}`}>
                    <img className={styles.image} src={image} alt="" />
                  </NavLink>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;