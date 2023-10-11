import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { newReview } from "../../store/reviews";
import { getArtist } from "../../store/artist";
import { Rating } from "react-simple-star-rating";
import styles from "./NewReview.module.css";

const NewReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const { artistId } = useParams();
  const artist = useSelector(state => ( state.artists.artist ));

  useEffect(() => {
    dispatch(getArtist(artistId)).then(setIsLoaded(true));
  }, [dispatch, artistId]);

  const handleRating = rate => {
    setRating(rate);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const reviewData = {
      "rating": rating,
      "title": title,
      "body": body,
      "artist_id": artist.id,
    };
    
    await(dispatch(newReview(reviewData)));
    navigate(`/artists/${artistId}`)
  };
  
  if (!isLoaded) return <div>Loading...</div>;
  
  const enabled_submit = rating && title && body;

  const image = artist.images.find(image => image.includes("ARTIST_PAGE"));

  const divStyle = {
    backgroundImage: `url(${image})`
  };

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.artistHeaderContainer}>
        <div className={styles.backgroundImg} style={divStyle}>
        </div>
        <div className={styles.artistHeaderContent}>
          <nav className={styles.navContainer}>
            <ol className={styles.navOL}>
              <li className={styles.navLI}>
                <NavLink className={styles.navlink} to="/">Home /</NavLink>
              </li>
              <li className={styles.slash}></li>
              <li className={styles.navLI}>
                <NavLink className={styles.navlink} to="/events">{artist.classification.name} /</NavLink>
              </li>
              <li className={styles.slash}></li>
              <li className={styles.navLI}>
                {artist.genre.name} /
              </li>
              <li className={styles.slash}></li>
              <li className={styles.navLI}>
                {artist.name} Tickets
              </li>
            </ol>
          </nav>
          <div className={styles.artistTitleContainer}>
            <img className={styles.artistImage} src={image} alt="" />
            <div className={styles.artistTitleContent}>
              <h1 className={styles.artistText}>
                {artist.name}
                <span className={styles.writeAReview}>
                  Write a Review
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.reviewFormContainer}>
        <div className={styles.reviewFormSub}>
          <NavLink className={styles.backToEvents} to={`/artists/${artistId}`}>{"<"} Back to events</NavLink>
          <div className={styles.formContainer}>
            <div className={styles.formSub}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.ratingContainer}>
                  <div className={styles.title}>
                    <h2 className={styles.titleText}>
                      1. Select Your Rating
                    </h2>
                  </div>
                  <div className={styles.starsContainer}>
                    <Rating
                      onClick={handleRating}
                    />
                  </div>
                </div>
                <div className={styles.reviewContentContainer}>
                  <div className={styles.title}>
                    <h2 className={styles.titleText}>
                      2. Write Your Review
                    </h2>
                  </div>
                  <div className={styles.reviewTitleContainer}>
                    <label className={styles.label}>
                      Your Review Title
                    </label>
                    <div className={styles.titleContainer}>
                      <div className={styles.titleContainerSub}>
                        <input
                          className={styles.titleInput}
                          name="title"
                          type="text"
                          value={title}
                          placeholder="A few words to sum up your experience"
                          required={true}
                          onChange={e => setTitle(e.target.value)}
                        />
                      </div>
                      <div className={styles.charMax}>Characters max: 100</div>
                    </div>
                  </div>
                  <div className={styles.reviewBodyContainer}>
                    <div className={styles.reviewBodySub}>
                      <label className={styles.label}>
                        Your Review
                      </label>
                      <div className={styles.bodyContainer}>
                        <textarea
                          className={styles.body}
                          name="body"
                          type="text"
                          value={body}
                          placeholder="Tell everyone the details about your experience"
                          required={true}
                          onChange={e => setBody(e.target.value)}
                        />
                      </div>
                      <div className={styles.charMax}>Characters max: 1000</div>
                    </div>
                  </div>
                </div>
                <div className={styles.buttonContainer}>
                  <button 
                    className={styles.button} 
                    type="submit" 
                    disabled={!enabled_submit}
                    >
                    Submit Your Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

};

export default NewReview;