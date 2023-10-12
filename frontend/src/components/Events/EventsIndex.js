import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { getEvents } from "../../store/event";
import EventCard from "./EventCard";
import { RotatingLines } from 'react-loader-spinner';
import styles from "./Events.module.css";

const EventsIndex = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  let events = useSelector(state => state.events.events);
  events = Object.values(events);
  
  const [displayedEvents, setDisplayedEvents] = useState(10);
  const batchSize = 10;
  const [sortOption, setSortOption] = useState("date");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  useEffect(() => {
    dispatch(getEvents(searchQuery)).then(() => setIsLoaded(true));
  }, [dispatch, searchQuery]);

  const sortedEvents = useMemo(() => {
    const sorted = [...events];
    
    if (sortOption === "date") {
      sorted.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
    } else if (sortOption === "nameAZ") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "nameZA") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    };
    
    return sorted;
  }, [events, sortOption]);

  if (!isLoaded) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.circle}>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      </div>
    );
  };

  const changeHeaderTitle = () => {
    if (searchQuery === "Music" || searchQuery === "music") {
      return "Concerts"
    } else if (searchQuery === "Sports" || searchQuery === "Sports") {
      return "Sports"
    } else if (searchQuery === "Arts" || searchQuery === "Arts") {
      return "Arts & Theatre"
    } else if (searchQuery === "Family" || searchQuery === "family") {
      return "Family"
    }
  };

  const headerTitle = changeHeaderTitle()

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
                <div className={styles.subTitle}>All {headerTitle} Tickets</div>
              </div>
          </div>
          <div className={styles.subHeaderTitle}>
            <h1 className={styles.subHeaderTitleText}>
              <span className={styles.concertText}>All {headerTitle} </span>
              <span className={styles.ticketsText}>Tickets</span>
            </h1>
          </div>
        </div>
      </div>
      <div className={styles.eventsContainer}>
        <div className={styles.eventsTitleContainer}>
          {searchQuery ? 
            <div className={styles.allConcertsText}>{events.length} Results for "{searchQuery}"</div> :
            <div className={styles.allConcertsText}>All Events ({events.length})</div>
          }
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
        )) 
      }
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

