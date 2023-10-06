import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { getReviews } from "../../store/reviews";
import styles from "./ReviewsIndex"

const ReviewsIndex = ({ artist }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reviews = useSelector(state => state.reviews.reviews)
  const [isLoaded, setIsLoaded] = useState(false);  

  useEffect(() => {
    dispatch(getReviews(artist.id));
    setIsLoaded(true);
  }, [dispatch, artist]);

  if (!isLoaded) return <div>Loading...</div>;
  console.log(reviews[0])

  return (
    <div className={styles.artistEventsContainer}>
      <div className={styles.artistEventsSubContainer}>
        <div className={styles.pageInfo}>
          <div className={styles.eventsTitleContainer}>
            <h2 className={styles.eventsTitle}>
              Reviews - <span className={styles.resultsCount}>{reviews.length} results</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ReviewsIndex;