import React, { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/session';
import styles from './Auth.module.css';

const Login = () => {
  const dispatch = useDispatch();
  
  const user = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) setErrors(data);
  };

  const inputEmail = async (e) => {
    setEmail(e.target.value);
  };

  const inputPassword = async (e) => {
    setPassword(e.target.value);
  };

  if (user) return <Navigate to="/" />;

  const enabled_submit = email && password;

  return (
    <div className={styles.auth}>
      <div className={styles.authContainer}>
        <div className={styles.authHeaderContainer}>
          <header className={styles.authHeader}>
            <h3 className={styles.authHeadText}>Sign In</h3>
          </header>
        </div>
        <div className={styles.authMain}>
          <p className={styles.authSubHeadText}>New to ShowSeeker? <NavLink className={styles.authLink} to="/signup">Sign Up</NavLink></p>
          <div className={styles.authFormContainer}>
            <form onSubmit={onLogin}>
              <div className={styles.authFieldContainer}>
                <label className={styles.authFieldLabel}>Email Address</label>
                <div className={styles.authlFieldBox}>
                  <input 
                    className={styles.authFieldInput}
                    type="text"
                    value={email} 
                    onChange={inputEmail} 
                  />
                  <div className={styles.errors}>{errors.email}</div>
                </div>
              </div>
              <div className={styles.authFieldContainer}>
                <label className={styles.authFieldLabel}>Password</label>
                <div className={styles.authFieldBox}>
                  <input 
                    className={styles.authFieldInput}
                    type="password"
                    value={password} 
                    onChange={inputPassword} 
                  />
                  <div className={styles.errors}>{errors.password}</div>
                </div>
              </div>
              <div className={styles.authSmallContainer}>
                <div className={styles.authSmallText}>
                  This is a Ticketmaster clone using the 
                  <a className={styles.authApiLink} target="_blank" rel="noopener noreferrer" href="https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/">&nbsp;Ticketmaster API</a>.
                  <br></br>Tech Stack: Flask & Python, React & Next.JS, PostgreSQL
                </div>
              </div>
              <div className={styles.authButtonContainer}>
                <button 
                  className={styles.authButton} 
                  type="submit"
                  disabled={!enabled_submit}
                  >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
