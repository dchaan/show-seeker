import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Homepage.module.css";
import searchIcon from "../../assets/search-icon.png";
import Card from "./Card";
import { getClassifications } from "../../store/classification";
import { getEvents } from "../../store/event";

const Homepage = () => {
  const classifications = useSelector(state => state.classifications.classifications);
  const filteredClassifications = Object.values(classifications).filter(classification => classification['name'] !== 'Undefined' && classification['name'] !== 'Miscellaneous');
  const events = useSelector(state => state.events.events);
  const filteredEvents = Object.values(events);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getClassifications());
    dispatch(getEvents()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className={styles.indexContainer}>
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
      <div className={styles.homepageContentContainer}>
        <div className={styles.categoryContainer}>
          <div className={styles.categorySub}>
            <div className={styles.categorySubSub}>
              <div className={styles.categoryTitleContainer}>
                <h3 className={styles.categoryTitleText}>
                  Browse By Category
                </h3>
              </div>
              <div className={styles.componentContainer}>
                {filteredClassifications.map(classification => (
                  <Card item={classification} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <h1>Top Selling</h1>
        <div>
          <h2>Concerts</h2>
        </div>
        <h2>Sports</h2>
        <h2>Arts & Theater</h2>
        <h2>Discover More Events</h2>
      </div>
    </div>
  );
};

export default Homepage;