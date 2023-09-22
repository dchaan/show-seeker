const GET_PURCHASES = "user/GET_PURCHASES";
const NEW_PURCHASE = "user/NEW_PURCHASE";
const DELETE_PURCHASE = "user/DELETE_PURCHASE";

const _getPurchases = purchases => ({
  type: GET_PURCHASES,
  purchases
});

const _newPurchase = purchase => ({
  type: NEW_PURCHASE,
  purchase
});

const _deletePurchase = purchase => ({
  type: DELETE_PURCHASE,
  purchase
});

export const getPurchases = userId => async (dispatch) => {
  const response = await fetch(`/api/user/${userId}/purchases`);

  if (!response.ok) {
    console.log("An error occurred");
    throw new Error("An error occurred");
  };

  const purchases = await response.json();
  dispatch(_getPurchases(purchases));
  return purchases;
};

export const newPurchase = purchaseData => async (dispatch) => {
  const response = await fetch(`/api/user/${purchaseData.user_id}/purchases`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(purchaseData)
  });

  if (!response.ok) {
    console.log("An error occurred");
    throw new Error("An error occurred");
  };

  const purchase = await response.json();
  dispatch(_newPurchase(purchase));
};

export const deletePurchase = purchase => async (dispatch) => {
  const response = await fetch (`/api/user/${purchase.user_id}/purchases/${purchase.id}`, {
    method: "DELETE"
  });
  debugger

  if (!response.ok) {
    console.log("An error occurred");
    throw new Error("An error occurred");
  };

  dispatch(_deletePurchase(purchase));
};

const purchasesReducer = (state = { purchases: [] }, action) => {
  Object.freeze(state);
  switch(action.type) {
    case GET_PURCHASES:
      return {
        ...state,
        purchases: action.purchases,
      };
    case NEW_PURCHASE:
      return {
        ...state,
        purchases: [...state.purchases, action.purchase],
      };
    case DELETE_PURCHASE:
      return {
        ...state,
        purchases: state.purchases.filter((purchase) => purchase.id !== action.purchase.id),
      };
    default:
      return state;
  };
};

export default purchasesReducer;