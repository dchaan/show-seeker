import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
import searchIcon from "../../assets/search-icon.png";
import IndexContainer from "./IndexContainer";
import { getClassifications } from "../../store/classification";

const Homepage = () => {
  const classifications = useSelector((state) => state.classification.classifications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClassifications());
  }, [dispatch]);

  return (
    <div className={styles.indexContainer}>
      {console.log(classifications)}
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
      </div>
      <h2>Sports</h2>
      <h2>Arts & Theater</h2>
      <h2>Discover More Events</h2>
    </div>
  );
};

export default Homepage;