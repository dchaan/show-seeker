const GET_EVENT = "event/GET_EVENT";
const GET_EVENTS = "event/GET_EVENTS";

const _getEvent = event => ({
  type: GET_EVENT,
  event
});

const _getEvents = events => ({
  type: GET_EVENTS,
  events
});

export const getEvent = eventId => async (dispatch) => {
  const response = await fetch(`/api/events/${eventId}`);

  if (!response.ok) {
    console.log("An error occurred");
    throw new Error("An error occurred");
  };

  const event = await response.json();
  dispatch(_getEvent(event));
  return event;
};

export const getEvents = (query = null) => async (dispatch) => {
  const response = await fetch(`/api/events${query ? "?query=" + query : ""}`);

  if (!response.ok) {
    console.log("An error occurred");
    throw new Error("An error occurred");
  }
  
  const events = await response.json();
  dispatch(_getEvents(events));
  return events
};

const eventsReducer = (state = { event: {}, events: {} }, action) => {
  Object.freeze(state);
  switch(action.type) {
    case GET_EVENT:
      return {
        ...state,
        event: action.event,
      };
    case GET_EVENTS:
      return {
        ...state,
        events: action.events,
      };
    default:
      return state;
  };
};

export default eventsReducer