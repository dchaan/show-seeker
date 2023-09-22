import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deletePurchase } from "../../store/purchases";
import styles from "./PurchaseCard.module.css";

const PurchaseCard = ({ purchase }) => {
  const dispatch = useDispatch();
  const date = new Date(purchase.event_date);
  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const handleDeletePurchase = () => {
    dispatch(deletePurchase(purchase));
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.eventInfo}>
        <div className={styles.date}>{formattedDate}</div>
        <h3 className={styles.event}>{purchase.event}</h3>
        <div className={styles.venue}>{purchase.venue || 'Venue'}</div>
      </div>
      <div className={styles.orderInfo}>
        <div className={styles.purchaseID}>Order #{purchase.id}</div>
        <button className={styles.deleteButton} onClick={handleDeletePurchase}>
          Sell Tickets
        </button>
      </div>
    </div>
  );
};

export default PurchaseCard;