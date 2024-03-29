import { NavLink } from "react-router-dom";
import styles from "./EventCard.module.css";

const EventCard = ({ event }) => {
  const date = new Date(event.start_time);
  const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const formattedDayAndTime = date.toLocaleString("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZoneName: "short",
  });

  const image = event.images.find(image => image.includes("TABLET_LANDSCAPE_LARGE"));
  const altImage = event.images.find(image => image.includes("SOURCE"));
  
  let location = "Venue";
  if (event.venue && event.venue.address) {
    const splitAddress = event.venue.address.split(',');
    const cityAndState = `${splitAddress[1].trim()}, ${splitAddress[2].trim()}`;
    location = `${event.venue.name} - ${cityAndState}`;
  };

  return (
    <div className={styles.eventsInfoContainer}>
      <div className={styles.eventInfo}>
        <div className={styles.eventLink}>
          <div className={styles.eventLinkContainer}>
            <div className={styles.imageContainer}>
              <img className={styles.image} src={image ? image : altImage} alt="" lazy="true" />
            </div>
            <div className={styles.dateContainer}>
              <span className={styles.date}>{formattedDate}</span>
              <span className={styles.time}>{formattedDayAndTime}</span>
            </div>
            <div className={styles.nameContainer}>
              <div className={styles.nameSubContainer}>
                <div className={styles.nameText}>
                  <span>{event.name}</span>
                </div>
                <div className={styles.venueText}>
                  <span>{location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <NavLink className={styles.navlink} to={`/events/${event.id}`}>
            <button className={styles.button}>See Tickets</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default EventCard;