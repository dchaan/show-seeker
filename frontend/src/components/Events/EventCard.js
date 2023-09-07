import { NavLink } from "react-router-dom";
import styles from "./Events.module.css";

const EventCard = ({ event }) => {

  const date = new Date(event.start_time)
  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const formattedDayAndTime = date.toLocaleString('en-US', {
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZoneName: 'short',
  });

  const image = event['images'].find(image => image.includes('TABLET_LANDSCAPE_LARGE'));
  const altImage = event['images'].find(image => image.includes('SOURCE'));

  return (
    <div className={styles.eventsInfoContainer}>
      <div className={styles.eventInfo}>
        <div className={styles.eventLink}>
          <div className={styles.eventLinkContainer}>
            <div className={styles.imageContainer}>
              <img className={styles.image} src={image ? image : altImage} alt="" />
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
                  <span>Venue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          {console.log(event)}
          <NavLink to={`/events/${event.id}`}>
            <button className={styles.button}>See Tickets</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default EventCard;