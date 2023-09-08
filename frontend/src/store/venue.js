const GET_VENUE = "venue/GET_VENUE";
const GET_VENUES = "venue/GET_VENUES";

const _getVenue = venue => ({
  type: GET_VENUE,
  venue
});

const _getVenues = venues => ({
  type: GET_VENUES,
  venues
});

export const getVenue = venueId => async (dispatch) => {
  const response = await fetch (`/api/venues/${venueId}`);

  if (!response.ok) {
    console.log("An error occurred");
    throw new Error("An error occurred");
  };

  const venue = response.json();
  dispatch(_getVenue(venue));
  return venue;
};

export const getVenues = (query = null) => async (dispatch) => {
  const response = await fetch(`/api/venues/${query ? "?query=" + query : ""}`);

  if (!response.ok) {
    console.log("An error occurred");
    throw new Error("An error occurred");
  };

  const venues = await response.json();
  dispatch(_getVenues(venues));
  return venues;
};

const venuesReducer = (state = { venue: {}, venues: {} }, action) => {
  Object.freeze(state);
  switch(action.type) {
    case GET_VENUE:
      return {
        ...state,
        venue: action.venue
      };
    case GET_VENUES:
      return {
        ...state,
        venues: action.venues
      };
    default:
      return state;
  };
};

export default venuesReducer;