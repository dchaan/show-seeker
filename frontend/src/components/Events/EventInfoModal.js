import { NavLink } from "react-router-dom";
import styles from "./EventInfoModal.module.css";

const EventInfoModal = ({ event, onClose }) => {
  const { name, artist, genre, classification, venue, start_time, ticket_limit, accessibility} = event;

  const date = new Date(start_time);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  });

  let location = "Venue"
  if (venue && venue.address) {
    const splitAddress = venue.address.split(",")
    const cityAndState = `${splitAddress[1].trim()}, ${splitAddress[2].trim()}`;
    location = `${venue.name}, ${cityAndState}`
  };

  let image = null;
  let altImage = null;
  if (artist) {
    image = artist.images.find(image => image.includes("CUSTOM"));
    altImage = artist.images.find(image => image.includes("SOURCE"));
  }


  return (
    <div className={styles.modalContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.titleContainer}>
          <h2 className={styles.titleText}>More Info</h2>
          <button className={styles.close} onClick={onClose}>&times;</button>
        </div>
        <ol className={styles.ol}>
          <li className={styles.li}>
            <NavLink className={styles.navlink} to={"/"}>
              ShowSeeker
            </NavLink>
            <span className={styles.slash}>/</span>
          </li>
          <li className={styles.li}>
            <span className={styles.span}>{classification.name}</span>
            <span className={styles.slash}>/</span>
          </li>
          <li className={styles.li}>
            <span className={styles.span}>{genre.name}</span>
            <span className={styles.slash}>/</span>
          </li>
          <li className={styles.li}>
            <span className={styles.span}>{artist.name}</span>
          </li>
        </ol>
        <div className={styles.contentContainer}>
          <div className={styles.contentSubContainer}>
            <div className={styles.contentInfoContainer}>
              <div className={styles.eventTitleContainer}>
                <h2 className={styles.eventTitle}>{name}</h2>
              </div>
              <div className={styles.sectioContainer}>
                <div className={styles.venueContainer}>
                  <div className={styles.venueInfo}>
                    <div className={styles.venueInfoTitle}>Date</div>
                    <div className={styles.venueInfoData}>{formattedDate}</div>
                  </div>
                  <div className={styles.venueInfo}>
                    <div className={styles.venueInfoTitle}>Venue</div>
                    <div className={styles.venueInfoData}>{location}</div>
                  </div>
                </div>
              </div>
              <div className={styles.sectionContainer}>
                <h3 className={styles.sectionTitle}>Additional Info</h3>
                <p className={styles.text}>{venue.general_info}</p>
              </div>
              <div className={styles.sectionContainer}>
                <h3 className={styles.sectionTitle}>Box Office Info</h3>
                <p className={styles.text}>{venue.box_office_info}</p>
              </div>
              <div className={styles.sectionContainer}>
                <h3 className={styles.sectionTitle}>Lineup</h3>
                  <div className={styles.imageContainer}>
                    {artist ? (
                      <NavLink className={styles.artistLink} to={`/artists/${artist.id}`}>
                        <img className={styles.image} src={image} alt={altImage} />
                      <div className={styles.artistName}>{artist.name}</div>
                    </NavLink>
                    ) : (
                      ""
                    )}
                  </div>
              </div>
              <div className={styles.sectionContainer}>
                <div className={styles.sectionTitle}>Ticket Limits</div>
                <p className={styles.text}>{ticket_limit}</p>
              </div>
              <div className={styles.sectioContainer}>
                <div className={styles.sectionTitle}>Accessible Tickets</div>
                <p className={styles.text}>{accessibility}</p>
              </div>
              <div className={styles.sectioContainer}>
                <p className={styles.text}>Prices are in US $</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfoModal;