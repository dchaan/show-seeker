'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
// import { useUser } from '../context/user_context';
import styles from '../styles/auth.module.css';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const { login, isAuthenticated } = useUser();
  // const router = useRouter();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push('/');
  //   }
  // }, [isAuthenticated]);

  const handleSubmit = async (event) => {
    // event.preventDefault();

    // const formData = {
    //   email,
    //   password
    }

  //   try {
  //     const response = await axios.post('http://localhost:8080/login', formData);
  //     console.log(response)
  //     if (response.status === 200) {
  //       login(formData)
  //       console.log('User logged in successfully!');
  //       router.push('/')
  //     } else {
  //       console.error('Login failed:', response.statusText);
  //       const errorMessage = await response.text();
  //       console.log('Error:', errorMessage)
  //     }
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //   }
  // };

  return (
    <div className={styles.auth}>
      <div className={styles.authContainer}>
        <div className={styles.authHeaderContainer}>
          <header className={styles.authHeader}>
            <h3 className={styles.authHeadText}>Sign In</h3>
          </header>
        </div>
        <div className={styles.authMain}>
          <p className={styles.authSubHeadText}>New to ShowSeeker? <Link className={styles.authLink} href="/signup">Sign Up</Link></p>
          <div className={styles.authFormContainer}>
            <form onSubmit={handleSubmit}>
              <div className={styles.authFieldContainer}>
                <label className={styles.authFieldLabel}>Email Address</label>
                <div className={styles.authlFieldBox}>
                  <input className={styles.authFieldInput} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className={styles.authFieldContainer}>
                <label className={styles.authFieldLabel}>Password</label>
                <div className={styles.authFieldBox}>
                  <input className={styles.authFieldInput} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <div className={styles.authSmallContainer}>
                <div className={styles.authSmallText}>
                  This is a Ticketmaster clone using the 
                  <a className={styles.authApiLink} target="_blank" rel="noopener" href="https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/">&nbsp;Ticketmaster API</a>.
                  <br></br>Tech Stack: Flask & Python, React & Next.JS, PostgreSQL
                </div>
              </div>
              <div className={styles.authButtonContainer}>
                <button className={styles.authButton} type="submit">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
