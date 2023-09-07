const GET_ARTIST = "artist/GET_ARTIST";
const GET_ARTISTS = "artist/GET_ARTISTS";

const _getArtist = artist => ({
  type: GET_ARTIST,
  artist
});

const _getArtists = artists => ({
  type: GET_ARTISTS,
  artists
});

export const getArtist = artistId => async (dispatch) => {
  const response = await fetch (`/api/artists/${artistId}`);

  if (!response.ok) {
    console.log("An error occurred");
    throw new Error("An error occurred");
  };

  const artist = await response.json();
  dispatch(_getArtist(artist));
  return artist;
};

export const getArtists = (query = null) => async (dispatch) => {
  const response = await fetch(`/api/artists/${query ? "?query=" + query : ""}`);

  if (!response.ok) {
    console.log("An error occurred");
    throw new Error("An error occurred");
  };

  const artists = await response.json();
  dispatch(_getArtists(artists));
  return artists;
};

const artistsReducer = (state = { artist: {}, artists: {} }, action) => {
  Object.freeze(state);
  switch(action.type) {
    case GET_ARTIST:
      return {
        ...state,
        artist: action.artist
      };
    case GET_ARTISTS:
      return {
        ...state,
        artists: action.artists
      };
    default:
      return state;
  };
};

export default artistsReducer;