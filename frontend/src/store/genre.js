const GET_GENRE = "genre/GET_GENRE";
const GET_GENRES = "genre/GET_GENRES";

const _getGenre = genre => ({
  type: GET_GENRE,
  genre
});

const _getGenres = genres => ({
  type: GET_GENRES,
  genres
});

export const getGenre = genreId => async (dispatch) => {
  const response = await fetch(`/api/genres/${genreId}`);
  if (!response.ok) {
    console.log("An error occurred");
    throw new Error("An error occurred");
  };
  const genre = await response.json();
  dispatch(_getGenre(genre));
  return genre;
};

export const getGenres = () => async (dispatch) => {
  const response = await fetch('/api/genres');

  if (!response.ok) {
    console.log("An error occurred");
    throw new Error("An error occurred");
  };
  
  const genres = await response.json()
  dispatch(_getGenres(genres));
  return genres;
};

const genresReducer = (state = { genre: {}, genres: {}}, action) => {
  switch (action.type) {
    case GET_GENRE:
      return {
        ...state,
        genre: action.genre
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.genres
      };
    default:
      return state;
  };
};

export default genresReducer;