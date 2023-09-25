import React from "react";
import styles from "./Footer.module.css"

function Footer() {
  return (
    <div className={styles.footerDiv}>
      <footer className={styles.footerContainer}>
        <p className={styles.footerText}>
          This is a Ticketmaster clone using the 
          <a className={styles.footerApiLink} target="_blank" rel="noopener noreferrer" href="https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/">&nbsp;Ticketmaster API</a>.
        </p>
        <p className={styles.footerText}>
          Back End: Flask & Python
        </p>
        <p className={styles.footerText}>
          Front End: React & Next.JS
        </p>
        <p className={styles.footerText}>
          Database: PostgreSQL
        </p>
      </footer>
    </div>
  )
}

export default Footer;