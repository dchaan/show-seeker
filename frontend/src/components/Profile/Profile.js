import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./Profile.module.css";

const Profile = () => {
  const navigate = useNavigate();
  
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    if (!user) navigate("/");
  });

  return (
    <div className={styles.profileContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.titleTextContainer}>
          <div className={styles.titleText}>
            Account Overview
          </div>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.mainTitleContainer}>
            <div className={styles.myInfo}> My Info</div>
            <div className={styles.infoContainer}>
              <div className={styles.userInfoContainer}>
                <div className={styles.subTitleText}>First Name</div>
                <div className={styles.subInfoText}>{user.first_name}</div>
              </div>
              <div className={styles.userInfoContainer}>
                <div className={styles.subTitleText}>Last Name</div> 
                <div className={styles.subInfoText}>{user.last_name}</div>
              </div>
              <div className={styles.userInfoContainer}>
                <div className={styles.subTitleText}>Email</div>
                <div className={styles.subInfoText}>{user.email}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.sideContainer}>
          <div className={styles.sideUserContainer}>
            <div className={styles.sideNameContainer}>
              <div className={styles.sideNameText}>
                <div className={styles.sideName}>{user.first_name}</div>
                <div className={styles.sideName}>{user.last_name}</div>
                <div className={styles.fanTextContainer}>
                  <div className={styles.fanText}>Fan since 2023</div>
                </div>
              </div>
            </div>
            <div className={styles.sideInfoContainer}>
              <div className={styles.sideInfoTextContainer}>
                <div className={styles.sideInfoTitle}>Email Address</div>
                <div className={styles.sideInfoText}>{user.email}</div>
              </div>
            </div>
          </div>
          <div className={styles.sideLinksContainer}>
            <ul className={styles.sideListContainer}>
              <li className={styles.sideListItem}>
                <NavLink className={styles.sideListLink} to={`/users/${user.id}/purchases`}>My Tickets</NavLink>
              </li>
              <li className={styles.sideListItem}>
                <NavLink className={styles.sideListLink} to={`/users/${user.id}/favorites`}>My Favorites</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;