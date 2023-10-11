import React, { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signup } from '../../store/session';
import styles from './Auth.module.css';

const Signup = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setSerrors] = useState([]);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignup = async (e) => {
    e.preventDefault();
    const data = await dispatch(signup(first_name, last_name, email, password));
    if (data) setSerrors(data);
  };

  if (user) return <Navigate to="/" />;

  const enabled_submit = first_name && last_name && email && password;

  return (
    <div className={styles.auth}>
      <div className={styles.authContainer}>
        <div className={styles.authHeaderContainer}>
          <header className={styles.authHeader}>
            <h3 className={styles.authHeadText}>Sign Up</h3>
          </header>
        </div>

        <div className={styles.authMain}>
          <p className={styles.authSubHeadText}>Already have a ShowSeeker Account? <NavLink className={styles.authLink} to="/login">Sign In</NavLink></p>
          <div className={styles.authFormContainer}>
            <form onSubmit={onSignup}>
              <div className={styles.authFieldContainer}>
                <label className={styles.authFieldLabel}>Email Address</label>
                <div className={styles.authFieldBox}>
                  <input
                    className={styles.authFieldInput} 
                    name="email"
                    type="text"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                  {errors && <p className={styles.errors}>{errors.email}</p>}
                </div>
              </div>
              <div className={styles.authFieldContainer}>
                <label className={styles.authFieldLabel}>Password</label>
                <div className={styles.authFieldBox}>
                  <input 
                    className={styles.authFieldInput}
                    name="password"
                    type="password" 
                    value={password}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                  {errors && <p className={styles.errors}>{errors.password}</p>}
                </div>
              </div>
              <div className={styles.authFirstLastName}>
                <div className={styles.authNameContainer}>
                  <div className={styles.authName}>
                    <label className={styles.authFieldLabel}>First Name</label>
                    <div className={styles.authFieldBox}>
                      <input 
                        className={styles.authFieldInput} 
                        name="first_name"
                        type="text"
                        value={first_name} 
                        required={true}
                        onChange={(e) => setFirstName(e.target.value)} 
                      />
                      {errors && <p className={styles.errors}>{errors.first_name}</p>}
                    </div>
                  </div>
                </div>
                  <div className={styles.authNameContainer}>
                    <div className={styles.authName}>
                      <label className={styles.authFieldLabel}>Last Name</label>
                      <div className={styles.authFieldBox}>
                        <input 
                          className={styles.authFieldInput}
                          name="last_name"
                          type="text"
                          value={last_name}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors && <p className={styles.errors}>{errors.last_name}</p>}
                      </div>
                    </div>
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
                    Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
