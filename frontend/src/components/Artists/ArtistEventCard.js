import { NavLink } from "react-router-dom";
import styles from "./ArtistEventCard.module.css";

const ArtistEventCard = ({ event }) => {
  const date = new Date(event.start_time);
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  const weekday = date.toLocaleString('en-US', { weekday: 'short' });
  const time = date.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
  const timeZone = date.toTimeString().split(' ')[5];

  console.log(event)
  let location = 'Venue'
  if (event.venue) {
    const splitAddress = event.venue.address.split(',');
    const cityAndState = `${splitAddress[1].trim()}, ${splitAddress[2].trim()}`;
    location = `${cityAndState} - ${event.venue.name}`;
  };

  return (
    <div className={styles.artistEventCardContainer}>
      <div className={styles.eventContent}>
        <div className={styles.dateContainer}>
          <div className={styles.month}>{month}</div>
          <div className={styles.date}>{day}</div>
        </div>
        <div className={styles.eventInfo}>
          <div className={styles.dayAndTimeContainer}>
            <span className={styles.dayAndTime}>{weekday} - {time}</span>
          </div>
          <div>
            <span className={styles.venueContainer}>{location}</span>
            <span className={styles.eventName}>{event.name}</span>
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <NavLink className={styles.navlink} to={`/events/${event.id}`}>
          <button className={styles.button}>Find Tickets</button>
        </NavLink>
      </div>
    </div>
  );
};

export default ArtistEventCard;