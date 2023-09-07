import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
import searchIcon from "../../assets/search-icon.png";
import IndexContainer from "./IndexContainer";
import { getClassifications } from "../../store/classification";
import { getEvents } from "../../store/event";

const Homepage = () => {
  const classifications = useSelector(state => state.classifications.classifications);
  const events = useSelector(state => state.events.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClassifications());
    dispatch(getEvents());
}, [dispatch]);

  return (
    <div className={styles.indexContainer}>
      {/* {console.log(Object.fromEntries(Object.entries(events).slice(0, 6)))} */}
      <div className={styles.subHeaderContainer}>
        <div className={styles.subHeaderSubContainer}>
          <div className={styles.subHeaderContentContainer}>
            <div className={styles.subHeaderTextContainer}>
              <h2 className={styles.subHeaderTitle}>Let's Make Live Happen</h2>
              <p className={styles.subHeaderSubText}>Shop millions of live events and discover can't miss concerts, games, theater and more.</p>
            </div>
            <div className={styles.searchContainer}>
              <div className={styles.searchBar}>
                <div className={styles.searchIconContainer}>
                  <img className={styles.searchIcon} src={searchIcon} alt="" />
                </div>
                <input className={styles.searchInput}
                  type="text"
                  placeholder="Search for artists, venues, and events"
                  value=""
                />
                <div className={styles.searchButtonContainer}>
                  <button className={styles.searchButton}>Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>Browse by Category</h1>
        <IndexContainer items={classifications} />
      </div>
      <h1>Top Selling</h1>
      <div>
        <h2>Concerts</h2>
        <IndexContainer items={Object.fromEntries(Object.entries(events).slice(0, 6))} />
      </div>
      <h2>Sports</h2>
      <h2>Arts & Theater</h2>
      <h2>Discover More Events</h2>
    </div>
  );
};

export default Homepage;