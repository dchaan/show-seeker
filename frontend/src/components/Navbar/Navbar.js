import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { getEvents } from "../../store/event"
import HeaderSearchIcon from "../../assets/header-search-icon.png"
import styles from "./Navbar.module.css"

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const onLogout = async (e) => {
    await dispatch(logout()).then(navigate('/'));
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handleSearch = async(e) => {
    e.preventDefault();
    await dispatch(getEvents(searchQuery));
    navigate(`/events?query=${encodeURIComponent(searchQuery)}`);
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const myAccount = () => {
    if (user) {
      return (
        <>
          <span className={styles.headerLinkSpan}>
            <button className={styles.myAccountButton} onClick={openMenu}><p className={styles.myAccountText}>{user.first_name}</p></button>
          </span>
          {showMenu && (
            <div className={styles.accountMenuContainer}>
              <div className={styles.accountLinksContainer}>
                <NavLink className={styles.accountLink} to={`/users/${user.id}/profile`}>My Account</NavLink>
                <NavLink className={styles.accountLink} to={`/users/${user.id}/purchases`}>My Tickets</NavLink>
                <NavLink className={styles.accountLink} to={`/users/${user.id}/favorites`}>My Favorites</NavLink>
              </div>
              <div className={styles.logoutContainer}>
                <button className={styles.logoutButtonContainer} onClick={onLogout}>
                  Not&nbsp;
                  <span className={styles.name}>{user.first_name}</span>
                  ?&nbsp;
                  <span className={styles.signout}>
                    Sign Out
                  </span>
                </button>
              </div>
            </div>
          )}
        </>
      );
    } else {
      return (
        <span className={styles.headerLinkSpan}>
          <NavLink className={styles.headerLink} to="/login">Sign In</NavLink>
        </span>
      );
    };
  };

  return (
    <nav className={styles.headerContainer}>
      <div className={styles.headerSubContainer}>
        <Link className={styles.headerTitle} to="/">
          <h1 className={styles.headerTitleText}><i>ShowSeeker</i></h1>
        </Link>

        {window.location.pathname !== "/" && (
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <form className={styles.searchForm} onSubmit={handleSearch}>
              <div className={styles.searchIconContainer}>
                <img className={styles.searchIcon} src={HeaderSearchIcon} alt="" />
              </div>
              <input className={styles.searchInput}
                type="text"
                placeholder="Find millions of live experiences"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
        )}

        <div className={styles.headerLinksContainer}>
          <span className={styles.headerLinkSpan}>
            <NavLink className={styles.headerLink} to="/events">All Events</NavLink>
          </span>
          <span className={styles.headerLinkSpan}>
            <NavLink className={styles.headerLink} to="/events/concerts">Concerts</NavLink>
          </span>
          <span className={styles.headerLinkSpan}>
            <NavLink className={styles.headerLink} to="/events/sports">Sports</NavLink>
          </span>
          <span className={styles.headerLinkSpan}>
            <NavLink className={styles.headerLink} to="/artists">Artists</NavLink>
          </span>
        </div>
        <div className={styles.headerRightContainer}>
          <div className={styles.headerUser}>
            {myAccount()}
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

export default Navbar;