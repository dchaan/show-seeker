import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getReviews } from "../../store/reviews";
import star from "../../assets/star.png"
import styles from "./ReviewsIndex.module.css"
import ReviewCard from "./ReviewCard";

const ReviewsIndex = ({ artist }) => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews.reviews);
  const [isLoaded, setIsLoaded] = useState(false);  

  useEffect(() => {
    dispatch(getReviews(artist.id));
    setIsLoaded(true);
  }, [dispatch, artist]);

  if (!isLoaded) return <div>Loading...</div>;

  const handleAvgRating = () => {
    let sumRatings = 0;
    if (Array.isArray(reviews)) {
      reviews.map(review => (
        sumRatings += review.rating
      ));
      return (sumRatings / reviews.length).toFixed(1);
    } else {
      return sumRatings;
    };
  };

  const avgRating = handleAvgRating();

  const handleReviews = () => { 
    return Array.isArray(reviews) ? (
      <div className={styles.reviewsContainer}>
        <ul className={styles.ul}>
          {reviews.map(review => (
            <li className={styles.li}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div className={styles.noReviewsContainer}>
        <div className={styles.noReviewsSub}>
          <div className={styles.noReviewsSubSub}>
            <div className={styles.noReviewsTextContainer}>
              <div className={styles.noReviewsText}>There are no reviews.</div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className={styles.reviewsIndexContainer}>
      <div className={styles.reviewsIndexSub}>
        <div className={styles.reviewsTitleContainer}>
          <h2 className={styles.reviewsTitle}>
            Reviews - <span className={styles.resultsCount}>{reviews.length || 0}</span>
          </h2>
          <div className={styles.avgRatingContainer}>
            <div className={styles.avgRatingSub}>
              <img className={styles.star} src={star} alt={""} />
              <span className={styles.avgRating}>{avgRating}</span>
            </div>
          </div>
          <div className={styles.writeReviewContainer}>
            <NavLink className={styles.writeReview} to={`/artists/${artist.id}/reviews/new`}>
              <span className={styles.writeReviewText}>Write a review</span>
            </NavLink>
          </div>
        </div>
        {handleReviews()}
      </div>
    </div>
  )
};

export default ReviewsIndex;