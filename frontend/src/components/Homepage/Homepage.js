import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Homepage.module.css";
import searchIcon from "../../assets/search-icon.png";
import Card from "./Card";
import { getClassifications } from "../../store/classification";
import { getArtists } from "../../store/artist";
import { getEvents } from "../../store/event";

const Homepage = () => {
  const classifications = useSelector(state => state.classifications.classifications);
  const filteredClassifications = Object.values(classifications).filter(classification => classification.name !== "Undefined" && classification.name !== "Miscellaneous");
  const artists = useSelector(state => state.artists.artists);
  const filteredArtists = Object.values(artists);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getClassifications());
    dispatch(getArtists());
    dispatch(getEvents()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return <div>Loading...</div>

  const concerts = filteredArtists.filter(artist => artist.classification.name === "Music");
  const sports = filteredArtists.filter(artist => artist.classification.name === "Sports");
  const arts = filteredArtists.filter(artist => artist.classification.name === "Arts & Theatre");
  const family = filteredArtists.filter(artist => artist.classification.name === "Miscellaneous");

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
      <div className={styles.main}>
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
          <div className={styles.categoryContainer}>
            <div className={styles.categorySub}>
              <div className={styles.categorySubSub}>
                <div className={styles.categoryTitleContainer}>
                  <div className={styles.subTitleContainer}>
                    <h3 className={styles.categoryTitleText}>
                      Concerts
                    </h3>
                    <NavLink className={styles.navlink} to={`/events/concerts`}>
                      See All Concerts
                    </NavLink>
                  </div>
                </div>
                <div className={styles.componentContainer}>
                  {concerts.slice(0,8).map(event => (
                    <Card item={event} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.categoryContainer}>
            <div className={styles.categorySub}>
              <div className={styles.categorySubSub}>
                <div className={styles.categoryTitleContainer}>
                  <div className={styles.subTitleContainer}>
                    <h3 className={styles.categoryTitleText}>
                      Sports
                    </h3>
                    <NavLink className={styles.navlink} to={`/events/sports`}>
                      See All Sports
                    </NavLink>
                  </div>
                </div>
                <div className={styles.componentContainer}>
                  {sports.slice(0,8).map(event => (
                    <Card item={event} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.categoryContainer}>
            <div className={styles.categorySub}>
              <div className={styles.categorySubSub}>
                <div className={styles.categoryTitleContainer}>
                  <div className={styles.subTitleContainer}>
                    <h3 className={styles.categoryTitleText}>
                      Arts & Theatre
                    </h3>
                    <NavLink className={styles.navlink} to={`/events/arts&theatre`}>
                      See All Arts & Theatre
                    </NavLink>
                  </div>
                </div>
                <div className={styles.componentContainer}>
                  {arts.slice(0,8).map(event => (
                    <Card item={event} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.categoryContainer}>
            <div className={styles.categorySub}>
              <div className={styles.categorySubSub}>
                <div className={styles.categoryTitleContainer}>
                  <div className={styles.subTitleContainer}>
                    <h3 className={styles.categoryTitleText}>
                      Family
                    </h3>
                    <NavLink className={styles.navlink} to={`/events/concerts`}>
                      See All Family
                    </NavLink>
                  </div>
                </div>
                <div className={styles.componentContainer}>
                  {family.slice(0,8).map(event => (
                    <Card item={event} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;