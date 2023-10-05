import { useSelector, useDispatch } from "react-redux";
import { newPurchase } from "../../store/purchases";
import styles from "./PurchaseModal.module.css";
import { useNavigate } from "react-router-dom";

const PurchaseModal = ({ onClose, quantity }) => {
  const user = useSelector(state => state.session.user);
  const event = useSelector(state => state.events.event);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const purchaseData = {
    "event_id": event.id,
    "quantity": quantity
  };

  const handlePurchase = e => {
    if (user) {
      purchaseData.user_id = user.id;
      dispatch(newPurchase(purchaseData));
      navigate(`/users/${user.id}/purchases`)
    } else {
      navigate("/login");
    };
  };
  console.log(quantity)
  const ticket = quantity === 1 ? "ticket" : "tickets"
  let text = `Are you sure you want to purchese ${quantity} ${ticket} for ${event.name}?`
  let buttonText = "Yes, purchase tickets."

  if (!user) {
    text = "Please sign in to purchase tickets"
    buttonText = "Sign In"
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.titleContainer}>
          <h2 className={styles.titleText}>Confirm Purchase</h2>
          <button className={styles.close} onClick={onClose}>&times;</button>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.text}>
            {text}
          </p>
        </div>
        <div className={styles.confirmButtonContainer}>
          <button className={styles.button} onClick={handlePurchase}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
