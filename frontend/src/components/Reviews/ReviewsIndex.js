import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getReviews } from "../../store/reviews";
import star from "../../assets/star.png"
import styles from "./ReviewsIndex.module.css"
import ReviewCard from "./ReviewCard";

const ReviewsIndex = ({ artist }) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const reviews = useSelector(state => state.reviews.reviews);
  
  const [displayedReviews, setDisplayedReviews] = useState(10);
  const batchSize = 10;

  const sortedReviews = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));

  useEffect(() => {
    dispatch(getReviews(artist.id));
    setIsLoaded(true);
  }, [dispatch, artist]);

  if (!isLoaded) return <div>Loading...</div>;

  const handleAvgRating = () => {
    if (reviews.length === 0) {
      return 0;
    }

    const sumRatings = reviews.reduce((total, review) => total + review.rating, 0);
    return (sumRatings / reviews.length).toFixed(1);
  };

  const avgRating = handleAvgRating();

  const handleReviews = () => { 
    return reviews.length ? (
      <div>
        <div className={styles.reviewsContainer}>
          <ul className={styles.ul}>
            {sortedReviews.slice(0, displayedReviews).map(review => (
              <li className={styles.li}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.loadMoreContainer}>
          <div className={styles.loadMoreCountContainer}>
            <div className={styles.loadMoreCount}>Loaded {sortedReviews.slice(0, displayedReviews).length} of {reviews.length} reviews</div>
          </div>
          {displayedReviews < sortedReviews.length && (
            <div className={styles.loadMoreSubContainer}>
              <button className={styles.loadMoreButton} onClick={() => setDisplayedReviews(prev => prev + batchSize)}>
                More Reviews
              </button>
            </div>
          )}
        </div>
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
  );
};

export default ReviewsIndex;