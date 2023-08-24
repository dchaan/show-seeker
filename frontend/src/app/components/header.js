'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { useUser } from '../context/user_context';
import styles from '../styles/header.module.css';

function Header() {
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // const router = useRouter();
  // const { user, logout } = useUser();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = e => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    router.push({
      pathname: '/events',
      query: { keyword: searchQuery}
    });
  };

  const handleLogout = () => {
    logout(); // Call the logout function from the context
    router.push('/'); // Redirect to the home page after logout
  };

  return (
    <nav className={styles.headerContainer}>
      <div className={styles.headerSubContainer}>
        <Link className={styles.headerTitle} href="/">
          <h1 className={styles.headerTitleText}><i>ShowSeeker</i></h1>
        </Link>

        {isClient && window.location.pathname !== '/' && (
          <div className={styles.searchBarContainer}>
            <div className={styles.searchBar}>
              <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
                <div className={styles.searchIconContainer}>
                  <img className={styles.searchIcon} src="/header-search-icon.png" alt="" />
                </div>
                <input className={styles.searchInput}
                  type="text"
                  placeholder="Find millions of live experiences"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </form>
            </div>
          </div>
        )}

        <div className={styles.headerLinksContainer}>
          <span className={styles.headerLinkSpan}>
            <Link className={styles.headerLink} href="/events">Sports</Link>
          </span>
          <span className={styles.headerLinkSpan}>
            <Link className={styles.headerLink} href="/artists">Artists</Link>
          </span>
          <span className={styles.headerLinkSpan}>
            <Link className={styles.headerLink} href="/genres">Genres</Link>
          </span>
        </div>
        <div className={styles.headerRightContainer}>
          <div className={styles.headerUser}>
            <span className={styles.headerLinkSpan}>
              <Link className={styles.headerLink} href="/login">Sign In</Link>
            </span>
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
              <a className={styles.headerLink} target="_blank" rel="noopener" href="https://www.linkedin.com/in/david-chan-4b1929185/">LinkedIn</a>
            </span>
            <span className={styles.headerLinkSpan}>
              <a className={styles.headerLink} target="_blank" rel="noopener" href="https://dchaan.github.io/Portfolio/">Portfolio</a>
            </span>
            <span className={styles.headerLinkSpan}>
              <a className={styles.headerLink} target="_blank" rel="noopener" href="https://github.com/dchaan">GitHub</a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
