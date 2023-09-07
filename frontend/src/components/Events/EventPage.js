import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent } from "../../store/event";
import styles from "./EventPage.module.css";

const EventPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventId } = useParams();
  const event = useSelector((state) => ( state.events.event ));
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(getEvent(eventId)).then(res => {
      res.errors ? navigate('/') : setIsLoaded(true);
    });
  }, [dispatch, eventId, navigate]);

  if (!isLoaded) return <div>Loading...</div>

  const image = event['images'].find(image => image.includes('EVENT_DETAIL_PAGE'));
  const date = new Date(event.start_time);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return (
    <div className={styles.eventHeaderContainer}>
      <div className={styles.eventHeaderContentContainer}>
        <div className={styles.eventImageContainer}>
          <img className={styles.eventImage} src={image} alt="" />
        </div>
        <div className={styles.eventInfoContainer}>
          <div className={styles.eventInfo}>
            <div className={styles.eventName}>{event.name}</div>
            <div className={styles.eventDetailsContainer}>
              <div className={styles.eventDate}>{formattedDate}</div>
              <div className={styles.eventVenue}>Venue</div>
            </div>
          </div>
          <div className={styles.importantInfoContainer}>
            <div className={styles.importantInfo}>
              <p className={styles.importantInfoText}>
                <strong>Important Event Info: </strong>
                <span>Bag Policy: Backpacks and bags larger than 12" x 6" x 12" are not permitted in t...</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
