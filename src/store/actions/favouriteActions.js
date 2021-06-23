import {
  Favourite_Item_Add,
  Favourite_Item_Remove,
} from "../constants/favourite";
export const addToFavourite = (data) => async (dispatch, getState) => {
  dispatch({
    type: Favourite_Item_Add,
    payload: data,
  });
  localStorage.setItem(
    "favouriteItems",
    JSON.stringify(getState().favourite.favouriteItems)
  );
};
export const removeFromFavourite = (id) => (dispatch, getState) => {
  dispatch({
    type: Favourite_Item_Remove,
    payload: id,
  });
  localStorage.setItem(
    "favouriteItems",
    JSON.stringify(getState().favourite.favouriteItems)
  );
};
