import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent } from "../../store/event";
import styles from "./EventPage.module.css";
import EventInfoModal from "./EventInfoModal.js";
import PurchaseModal from "./PurchaseModal";

const EventPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventId } = useParams();
  const event = useSelector(state => state.events.event);
  const [isLoaded, setIsLoaded] = useState(false);
  const [importantInfoModal, setImportantInfoModal] = useState(false);
  const [eventInfoModal, setEventInfoModal] = useState(false);
  const [purchaseModal, setPurchaseModal] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  
  useEffect(() => {
    dispatch(getEvent(eventId)).then(res => {
      res.errors ? navigate('/') : setIsLoaded(true);
    });
  }, [dispatch, eventId, navigate]);

  if (!isLoaded) return <div>Loading...</div>;

  const openImportantInfoModal = () => {
    setImportantInfoModal(true);
  };

  const closeImportantInfoModal = () => {
    setImportantInfoModal(false);
  };

  const openEventInfoModal = () => {
    setEventInfoModal(true);
  };

  const closeEventInfoModal = () => {
    setEventInfoModal(false);
  };

  const openPurchaseModal = () => {
    setPurchaseModal(true);
  };

  const closePurchaseModal = () => {
    setPurchaseModal(false);
  };

  const handleQuantityChange = e => {
    setSelectedQuantity(parseInt(e.target.value));
  };

  const image = event.images.find(image => image.includes("EVENT_DETAIL_PAGE"));
  const date = new Date(event.start_time);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  });

  let location = "Venue"
  if (event.venue && event.venue.address) {
    const splitAddress = event.venue.address.split(",")
    const cityAndState = `${splitAddress[1].trim()}, ${splitAddress[2].trim()}`;
    location = `${event.venue.name}, ${cityAndState}`
  };

  let seatmap = event.seatmap || ""
  seatmap = seatmap.replace("https", "http").replace(/"/g, "");

  const priceArray = JSON.parse(event.price_range);
  let minPrice = 0;
  let maxPrice = 300;
  if (priceArray.length) {
    minPrice = Math.floor(priceArray[0].min);
    maxPrice = Math.floor(priceArray[0].max);
  };

  const renderImportantInfo = () => {
    if (event.venue && event.venue.general_info) {
      return event.venue.general_info;
    } else if (event.accessibility) {
      return event.accessibility;
    };
    return '';
  };

  const importantInfoText = renderImportantInfo();

  return (
    <div className={styles.eventPageContainer}>
      <div className={styles.eventHeaderContainer}>
        <div className={styles.eventHeaderContentContainer}>
          <div className={styles.eventImageContainer}>
            <img className={styles.eventImage} src={image} alt="" />
          </div>
          <div className={styles.eventInfoContainer}>
            <div className={styles.eventInfo}>
              <div className={styles.eventNameContainer}>
                <div className={styles.eventName}>{event.name}</div>
                <button className={styles.eventNameMoreInfo} onClick={openEventInfoModal}>
                  More Info
                </button>
                {eventInfoModal && (
                  <EventInfoModal event={event} onClose={closeEventInfoModal} />
                )}
              </div>
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
                  <button className={styles.moreButton} onClick={openImportantInfoModal}>more</button>
                  {importantInfoModal && (
                    <div className={styles.modalContainer}>
                      <div className={styles.modalContent}>
                        <div className={styles.modalTitleContainer}>
                          <h2 className={styles.modalTitle}>Important Event Info</h2>
                          <span className={styles.close} onClick={closeImportantInfoModal}>&times;</span>
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
      <div className={styles.eventTicketContainer}>
        <section className={styles.sectionContainer}>
          <div className={styles.pricesContainer}>
            <div className={styles.priceFilterContainer}>
              <div className={styles.ticketQtyContainer}>
                <select className={styles.ticketDropdown }value={selectedQuantity} onChange={handleQuantityChange}>
                  {[1, 2, 3, 4, 5, 6].map((quantity) => (
                    <option key={quantity} value={quantity}>
                      {quantity} Ticket{quantity !== 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.priceSliderContainer}>
                <div className={styles.priceContainer}>
                  <p className={styles.price}>${minPrice}</p>
                </div>
                <div className={styles.sliderContainer}>
                  <div className={styles.slider}></div>
                </div>
                <div className={styles.priceContainer}>
                  <p className={styles.price}>${maxPrice}+</p>
                </div>
              </div>
            </div>
            <div className={styles.priceTicketSubContainer}>
              <ul className={styles.ticketListContainer}>
                <button className={styles.ticketButton} onClick={openPurchaseModal}>
                  {purchaseModal && (
                    <PurchaseModal onClose={closePurchaseModal} quantity={selectedQuantity} />
                  )}
                  <li className={styles.ticketContainer}>
                    <div className={styles.ticketContent}>
                      <div className={styles.ticketSplit}>
                        <div className={styles.ticketSplitLeft}>
                          <span className={styles.ticketType}>
                            General Admission Tickets
                          </span>
                          <span className={styles.ticketSub}>
                            General Admission
                          </span>
                        </div>
                        <div className={styles.ticketSplitRight}>
                          <button className={styles.priceButton}>
                            ${minPrice}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </button>
                <button className={styles.ticketButton} onClick={openPurchaseModal}>
                  {purchaseModal && (
                    <PurchaseModal onClose={closePurchaseModal} quantity={selectedQuantity} />
                  )}
                  <li className={styles.ticketContainer}>
                    <div className={styles.ticketContent}>
                      <div className={styles.ticketSplit}>
                        <div className={styles.ticketSplitLeft}>
                          <span className={styles.ticketType}>
                            Premium VIP Tickets
                          </span>
                          <span className={styles.ticketSub}>
                            VIP Admission
                          </span>
                        </div>
                        <div className={styles.ticketSplitRight}>
                          <button className={styles.priceButton}>
                            ${maxPrice}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </button>
              </ul>
            </div>
          </div>
          <div className={styles.mapContainer}>
            <div className={styles.mapImgContainer}>
              <img className={styles.mapImage} src={seatmap} alt="" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventPage;
