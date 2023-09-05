const GET_CLASSIFICATION = "classification/GET_CLASSIFICATION";
const GET_CLASSIFICATIONS = "classification/GET_CLASSIFICATIONS";

const _getClassification = classification => ({
  type: GET_CLASSIFICATION,
  classification
});

const _getClassifications = classifications => ({
  type: GET_CLASSIFICATIONS,
  classifications
});

export const getClassification = classificationId => async (dispatch) => {
    const response = await fetch(`/api/classifications/${classificationId}`);
    
    if (!response.ok) {
      console.error("An error occurred");
      throw new Error("An error occurred");
    }
    const  classification = await response.json();
    dispatch(_getClassification(classification));
    return classification;
};

export const getClassifications = () => async (dispatch) => {
  const response = await fetch('/api/classifications');
  
  if (!response.ok) {
    console.error("An error occurred");
    throw new Error("An error occurred");
  }
  const classifications = await response.json();
  dispatch(_getClassifications(classifications));
  return classifications;
};

const initialState = {
  classification: null,
  classifications: [],
};

const classificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLASSIFICATION:
      return {
        ...state,
        classification: action.classification,
      };
    case GET_CLASSIFICATIONS:
      return {
        ...state,
        classifications: action.classifications,
      };
    default:
      return state;
  }
};

export default classificationReducer;

