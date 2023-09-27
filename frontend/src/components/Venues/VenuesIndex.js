import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./Venues.module.css";
import { getVenues } from "../../store/venue";

const VenuesIndex = () => {
  // let venues = useSelector(state => state.venues.venues);
  // venues = Object.values(venues);

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getVenues()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={styles.venuesIndexContainer}>
    </div>
  );
};

export default VenuesIndex;