const GET_FAVORITES = "user/GET_FAVORITES";
const SET_FAVORITE = "user/SET_FAVORITE";
const REMOVE_FAVORITE = "user/REMOVE_FAVORITE";

const _getFavorites = favorites => ({
  type: GET_FAVORITES,
  favorites
});

const _setFavorite = artist => ({
  type: SET_FAVORITE,
  artist
});

const _removeFavorite = artist => ({
  type: REMOVE_FAVORITE,
  artist
});

export const getFavorites = userId => async (dispatch) => {
  const response = await fetch(`/api/user/${userId}/favorites`);

  if (!response.ok) {
    console.log("An error occurred");
    throw new Error("An error occurred");
  }; 

  const favorites = await response.json();
  dispatch(_getFavorites(favorites));
  return favorites;
}

export const setFavorite = artist => async (dispatch) => {
  const response = await fetch(`/api/artists/${artist.id}/favorite`);

  if (!response.ok) {
    console.log("An error occurred");
    throw new Error("An error occurred");
  }; 

  const favoritedArtist = await response.json();
  dispatch(_setFavorite(favoritedArtist));
};

export const removeFavorite = artist => async (dispatch) => {
  const response = await fetch(`/api/artists/${artist.id}/unfavorite`, {
    method: "DELETE"
  });

  if (!response.ok) {
    console.log("An error occurred");
    throw new Error("An error occurred");
  }; 

  const unfavoritedArtist = await response.json();
  dispatch(_removeFavorite(unfavoritedArtist));
};

const favoritesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.favorites
      };
    case SET_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.artist]
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((artist) => artist.id !== action.artist.id)
      };
    default:
      return state;
  };
};

export default favoritesReducer;