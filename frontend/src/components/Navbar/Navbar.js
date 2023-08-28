import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import HeaderSearchIcon from '../../assets/header-search-icon.png'
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.headerContainer}>
      <div className={styles.headerSubContainer}>
        <Link className={styles.headerTitle} to="/">
          <h1 className={styles.headerTitleText}><i>ShowSeeker</i></h1>
        </Link>

        {/* {window.location.pathname !== '/' && ( */}
        {/* <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <form className={styles.searchForm}>
              <div className={styles.searchIconContainer}>
                <img className={styles.searchIcon} src={HeaderSearchIcon} alt="" />
              </div>
              <input className={styles.searchInput}
                type="text"
                placeholder="Find millions of live experiences"
                value={""}
                onChange={""}
              />
            </form>
          </div>
        </div> */}
        {/* )} */}

        <div className={styles.headerLinksContainer}>
          <span className={styles.headerLinkSpan}>
            <NavLink className={styles.headerLink} to="/events">Sports</NavLink>
          </span>
          <span className={styles.headerLinkSpan}>
            <NavLink className={styles.headerLink} to="/artists">Artists</NavLink>
          </span>
          <span className={styles.headerLinkSpan}>
            <NavLink className={styles.headerLink} to="/genres">Genres</NavLink>
          </span>
        </div>
        <div className={styles.headerRightContainer}>
          <div className={styles.headerUser}>
            {/* {user ? ( // Show logout button if user is logged in
              <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <span className={styles.headerLinkSpan}>
                  <Link className={styles.headerLink} href="/login">Sign In</Link>
                </span>
              </>
            )} */}
            <span className={styles.headerLinkSpan}>
              <NavLink className={styles.headerLink} to="/login">Sign In</NavLink>
            </span>
            <span className={styles.headerLinkSpan}>
              <a className={styles.headerLink} target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/david-chan-4b1929185/">LinkedIn</a>
            </span>
            <span className={styles.headerLinkSpan}>
              <a className={styles.headerLink} target="_blank" rel="noopener noreferrer" href="https://dchaan.github.io/Portfolio/">Portfolio</a>
            </span>
            <span className={styles.headerLinkSpan}>
              <a className={styles.headerLink} target="_blank" rel="noopener noreferrer" href="https://github.com/dchaan">GitHub</a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar