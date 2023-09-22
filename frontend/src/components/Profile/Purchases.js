import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { getPurchases } from "../../store/purchases";
import { logout } from '../../store/session';
import styles from "./Purchases.module.css";
import tickets from "../../assets/tickets.png";
import profile from "../../assets/profile.png";
import signout from "../../assets/logout.png"
import PurchaseCard from "./PurchaseCard";

const Purchases = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useParams();
  const user = useSelector(state => state.session.user)
  
  const purchases = useSelector(state => state.purchases.purchases);
  const sortedPurchases = purchases.sort((a, b) => {
    const dateA = new Date(a.purchase_date);
    const dateB = new Date(b.purchase_date);
    return dateB - dateA;
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getPurchases(userId.userId)).then(() => setIsLoaded(true))
  }, [dispatch, userId]);

  const onLogout = async (e) => {
    await dispatch(logout()).then(navigate('/'));
  }

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className={styles.purchasesContainer}>
      <div className={styles.headerContainer}></div>
      <div className={styles.welcomeBackContainer}>
        <div className={styles.welcomeBackContent}>
          <p className={styles.welcomeBackP}>
            <span className={styles.welcomeBackSpan}>Welcome Back!</span>
            <span className={styles.name}>{user.first_name}</span>
          </p>
        </div>
      </div>
      <div className={styles.sidebarContainer}>
        <nav className={styles.navContainer}>
          <div className={styles.linkContainer}>
            <button className={styles.linkButton} to={`/user/${userId.userId}/purchases`}>
              <div className={styles.iconContainer}>
                <img className={styles.icon} src={tickets} alt="" />
              </div>
              <span className={styles.myTicketsText}>My Tickets</span>
            </button>
          </div>
          <div className={styles.linkContainer}>
            <button className={styles.linkButton} to={`/user/${userId.userId}/profile`}>
              <div className={styles.iconContainer}>
                <img className={styles.icon} src={profile} alt="" />
              </div>
              <span className={styles.myTicketsText}>My Profile</span>
            </button>
          </div>
          <div className={styles.linkContainer}>
            <button className={styles.linkButton} onClick={onLogout}>
              <div className={styles.iconContainer}>
                <img className={styles.icon} src={signout} alt="" />
              </div>
              <span className={styles.signout}>Sign Out</span>
            </button>
          </div>
        </nav>
      </div>
      <div className={styles.headerSubContainer}>
        <div className={styles.headerContent}>
          <nav className={styles.homeNavContainer}>
            <ol className={styles.navOL}>
              <li className={styles.navLI}>
                <NavLink className={styles.navlink} to={'/'}>Home</NavLink>
                <span className={styles.slash}>/</span>
              </li>
              <li className={styles.navLI}>
                <span className={styles.span}>My Tickets</span>
              </li>
            </ol>
          </nav>
          <h1 className={styles.myTicketsTitle}>My Tickets</h1>
        </div>
      </div>
      <div className={styles.eventsContainer}>
        <div className={styles.eventsContent}>
          <ul className={styles.eventsUL}>
            {sortedPurchases.map(purchase => (
              <li className={styles.eventLI}>
                <PurchaseCard purchase={purchase} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
};

export default Purchases;