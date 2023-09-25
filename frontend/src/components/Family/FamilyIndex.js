import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../Events/Events.module.css";
import { getEvents } from "../../store/event";
import EventCard from "../Events/EventCard";

const FamilyIndex = () => {
  let events = useSelector(state => state.events.events);
  events = Object.values(events).filter(event => event.classification.name === "Family");

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayedEvents, setDisplayedEvents] = useState(10);
  const batchSize = 10;
  const [sortOption, setSortOption] = useState("date");

  useEffect(() => {
    dispatch(getEvents()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return <div>Loading...</div>;

  const sortEvents = () => {
    const sortedEvents = [...events];

    if (sortOption === "date") {
      sortedEvents.sort((a, b) => {
        const dateA = new Date(a.start_time);
        const dateB = new Date(b.start_time);

        if (isNaN(dateA) && !isNaN(dateB)) {
          return 1;
        } else if (!isNaN(dateA) && isNaN(dateB)) {
          return -1;
        } else if (isNaN(dateA) && isNaN(dateB)) {
          return 0; 
        };
        return dateA - dateB;
      });
    } else if (sortOption === "nameAZ") {
      sortedEvents.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (sortOption === "nameZA") {
      sortedEvents.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    };
    return sortedEvents;
  };

  const sortedEvents = sortEvents();

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
                <div className={styles.subTitle}>Family Tickets</div>
              </div>
          </div>
          <div className={styles.subHeaderTitle}>
            <h1 className={styles.subHeaderTitleText}>
              <span className={styles.concertText}>All Family </span>
              <span className={styles.ticketsText}>Tickets</span>
            </h1>
          </div>
        </div>
      </div>
      <div className={styles.eventsContainer}>
        <div className={styles.eventsTitleContainer}>
          <div className={styles.allConcertsText}>All Family Events ({events.length})</div>
        </div>
        <div className={styles.filterContainer}>
          <div className={styles.filterSubContainer}>
            <select className={styles.filterBox} value={sortOption} onChange={e => setSortOption(e.target.value)}>
              <option value="date">Sort By Date</option>
              <option value="nameAZ">Sort By Name A-Z</option>
              <option value="nameZA">Sort By Name Z-A</option>
            </select>
          </div>
        </div>
        {sortedEvents.slice(0, displayedEvents).map(event => (
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

export default FamilyIndex;

