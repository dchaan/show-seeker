import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Events.module.css";
import { getEvents } from "../../store/event";
import EventCard from "./EventCard";

const EventsIndex = () => {
  const events = useSelector(state => state.event.events);
  const dispatch = useDispatch();
  const [displayedEvents, setDisplayedEvents] = useState(10);
  const batchSize = 10;

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subHeader}>
        <div className={styles.subHeaderContainer}>
          <div className={styles.homeContainer}>
              <div className={styles.homeTextContainer}>
                <NavLink className={styles.homeLink} to="/">Home</NavLink>
                <div className={styles.slash}>
                  /
                </div>
                <div className={styles.subTitle}>Concert Tickets</div>
              </div>
          </div>
          <div className={styles.subHeaderTitle}>
            <h1 className={styles.subHeaderTitleText}>
              <span className={styles.concertText}>Concert </span>
              <span className={styles.ticketsText}>Tickets</span>
            </h1>
          </div>
        </div>
      </div>
      <div className={styles.eventsContainer}>
        <div className={styles.eventsTitleContainer}>
          <div className={styles.allConcertsText}>All Concert Events ({events.length})</div>
        </div>
        {events.slice(0, displayedEvents).map(event => (
          <EventCard event={event} />
        ))}
      </div>
      <div className={styles.loadMoreContainer}>
        {displayedEvents < events.length && (
          <div className={styles.loadMoreSubContainer}>
            <button className={styles.loadMoreButton} onClick={() => setDisplayedEvents(prev => prev + batchSize)}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsIndex;

