'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { useUser } from '../context/user_context';
import styles from '../styles/auth.module.css';


const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  // const { login } = useUser();
  // const router = useRouter();


  const handleSubmit = async (event) => {
    // event.preventDefault();

    // const formData = {
    //   email,
    //   password,
    //   first_name,
    //   last_name
    }

    // try {
    //   const response = await axios.post('http://localhost:8080/signup', formData);

    //   if (response.status === 201) {
    //     console.log('User signed up in successfully!');
    //     login(formData)
    //     router.push('/');
    //   } else {
    //     console.error('Login failed:', response.statusText);
    //     const errorMessage = await response.text();
    //     console.log('Error:', errorMessage)
    //   }
    // } catch (error) {
    //   console.error('An error occurred:', error);
    // }
  // };

  return (
    <div className={styles.auth}>
      <div className={styles.authContainer}>
        <div className={styles.authHeaderContainer}>
          <header className={styles.authHeader}>
            <h3 className={styles.authHeadText}>Sign Up</h3>
          </header>
        </div>

        <div className={styles.authMain}>
          <p className={styles.authSubHeadText}>Already have a ShowSeeker Account? <Link className={styles.authLink} href="/login">Sign In</Link></p>
          <div className={styles.authFormContainer}>
            <form onSubmit={handleSubmit}>
              <div className={styles.authFieldContainer}>
                <label className={styles.authFieldLabel}>Email Address</label>
                <div className={styles.authFieldBox}>
                  <input className={styles.authFieldInput} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className={styles.authFieldContainer}>
                <label className={styles.authFieldLabel}>Password</label>
                <div className={styles.authFieldBox}>
                  <input className={styles.authFieldInput} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <div className={styles.authFirstLastName}>
                <div className={styles.authNameContainer}>
                  <div className={styles.authName}>
                    <label className={styles.authFieldLabel}>First Name</label>
                    <div className={styles.authFieldBox}>
                      <input className={styles.authFieldInput} type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                  </div>
                </div>
                  <div className={styles.authNameContainer}>
                    <div className={styles.authName}>
                      <label className={styles.authFieldLabel}>Last Name</label>
                      <div className={styles.authFieldBox}>
                        <input className={styles.authFieldInput} type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                      </div>
                    </div>
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
                <button className={styles.authButton} type="submit">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
