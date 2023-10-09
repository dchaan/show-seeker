import { Rating } from "react-simple-star-rating";
import styles from "./ReviewCard.module.css";

const ReviewCard = ({ review }) => {
  const date = new Date(review.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })

  return (
    <div className={styles.reviewContainer}>
      <header className={styles.header}>
        <Rating 
          initialValue={review.rating}
          readonly={true}
          size={20}
        />
        <h3 className={styles.title}>{review.title}</h3>
        <span className={styles.user}>
          by {review.user.first_name} on {date}
        </span>
      </header>
      <div className={styles.reviewContentContainer}>
        <p className={styles.reviewBody}>{review.body}</p>
      </div>
    </div>
  );
};

export default ReviewCard;