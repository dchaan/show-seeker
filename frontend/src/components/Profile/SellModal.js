import { useDispatch } from "react-redux";
import { deletePurchase } from "../../store/purchases";
import styles from "./SellModal.module.css";

const SellModal = ({ onClose, purchase }) => {
  const dispatch = useDispatch();

  const handlePurchase = e => {
    dispatch(deletePurchase(purchase));
    onClose(e);
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.titleContainer}>
          <h2 className={styles.titleText}>Sell Tickets</h2>
          <button className={styles.close} onClick={onClose}>&times;</button>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.text}>
            Are you sure you want to sell tickets for {purchase.event}?
          </p>
        </div>
        <div className={styles.confirmButtonContainer}>
          <button className={styles.button} onClick={handlePurchase}>
            Yes, sell tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellModal;
