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
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    dispatch(getEvent(eventId)).then(res => {
      res.errors ? navigate('/') : setIsLoaded(true);
    });
  }, [dispatch, eventId, navigate]);

  if (!isLoaded) return <div>Loading...</div>;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


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

  let location = 'Venue'
  if (event.venue && event.venue.address) {
    const splitAddress = event.venue.address.split(',')
    const cityAndState = `${splitAddress[1].trim()}, ${splitAddress[2].trim()}`;
    location = `${event.venue.name}, ${cityAndState}`
  };

  const renderImportantInfo = () => {
    if (event.venue && event.venue.general_info) {
      return event.venue.general_info;
    } else if (event.accessibility) {
      return event.accessibility;
    }
    return '';
  };

  const importantInfoText = renderImportantInfo();

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
              <div className={styles.eventVenue}>{location}</div>
            </div>
          </div>
          {importantInfoText && (
          <div className={styles.importantInfoContainer}>
            <div className={styles.importantInfo}>
              <p className={styles.importantInfoText}>
                <strong>Important Event Info: </strong>
                <span>{importantInfoText.slice(0, 100)} ...</span>
                <button className={styles.moreButton} onClick={openModal}>more</button>
                {isModalOpen && (
                  <div className={styles.modalContainer}>
                    <div className={styles.modalContent}>
                      <div className={styles.modalTitleContainer}>
                        <h2 className={styles.modalTitle}>Important Event Info</h2>
                        <span className={styles.close} onClick={closeModal}>&times;</span>
                      </div>
                      <div className={styles.modalInfoContainer}>
                        <p>{importantInfoText}</p>
                      </div>
                    </div>
                  </div>
                )}
              </p>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
