import { NavLink } from "react-router-dom";
import styles from "./ArtistCard.module.css"

const ArtistCard = ({ artist }) => {
  const image = artist.images.find(image => image.includes("TABLET_LANDSCAPE_LARGE"));
  const altImage = artist.images.find(image => image.includes("SOURCE"));

  return (
    <div className={styles.artistsInfoContainer}>
      <div className={styles.artistInfo}>
        <div className={styles.artistLink}>
          <div className={styles.artistLinkContainer}>
            <div className={styles.imageContainer}>
              <img className={styles.image} src={image ? image : altImage} alt="" />
            </div>
            <div className={styles.nameContainer}>
              <div className={styles.nameSubContainer}>
                <div className={styles.nameText}>
                  <span>{artist.name}</span>
                </div>
                <div className={styles.genreText}>
                  <span>{artist.classification.name} - {artist.genre.name}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <NavLink className={styles.navlink} to={`/artists/${artist.id}`}>
              <button className={styles.button}>See Tickets</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtistCard;