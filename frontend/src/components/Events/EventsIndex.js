import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./Events.module.css";
import { getEvents } from "../../store/event";
import EventCard from "./EventCard";

const EventsIndex = () => {
  const events = useSelector(state => state.event.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <div>
      {events.map(event => (
        <EventCard event={event} />
      ))}
    </div>
  );
};

export default EventsIndex;

