const GET_REVIEWS = "user/GET_REVIEWS";
const NEW_REVIEW = "user/NEW_REVIEW";

const _getReviews = reviews => ({
  type: GET_REVIEWS,
  reviews
});

const _newReview = review => ({
  type: NEW_REVIEW,
  review
});

export const getReviews = artistId => async (dispatch) => {
  const response = await fetch(`/api/artist/${artistId}/reviews`);

  if (!response.ok) {
    console.log("An error occurred");
    throw new Error("An error occurred");
  };

  const reviews = await response.json();
  dispatch(_getReviews(reviews));
  return reviews;
};

export const newReview = reviewData => async (dispatch) => {
  const response = await fetch(`/api/artist/${reviewData.artist_id}/reviews/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reviewData)
  });

  if (!response.ok) {
    console.log("An error occurred");
    throw new Error("An error occurred");
  };

  const review = await response.json();
  dispatch(_newReview(review));
  return review;
};

const reviewsReducer = (state = { reviews: [] }, action) => {
  Object.freeze(state);
  switch(action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.reviews,
      };
    case NEW_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.review],
      };
    default:
      return state;
  };
};

export default reviewsReducer;