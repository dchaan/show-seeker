import { useSelector, useDispatch } from "react-redux";
import { newPurchase } from "../../store/purchases";
import styles from "./PurchaseModal.module.css";

const PurchaseModal = ({ onClose, quantity }) => {
  const user = useSelector(state => state.session.user);
  const event = useSelector(state => state.events.event);

  const dispatch = useDispatch();

  const purchaseData = {
    "user_id": user.id,
    "event_id": event.id,
    "quantity": quantity
  };

  const handlePurchase = e => {
    dispatch(newPurchase(purchaseData));
    onClose(e);
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.titleContainer}>
          <h2 className={styles.titleText}>Confirm Purchase</h2>
          <button className={styles.close} onClick={onClose}>&times;</button>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.text}>
            Are you sure you want to purchese {quantity} tickets for {event.name}?
          </p>
        </div>
        <div className={styles.confirmButtonContainer}>
          <button className={styles.button} onClick={handlePurchase}>
            Yes, purchase tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
