import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers/rootReducer";

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const favourItemsFromLocalStorage = localStorage.getItem("favouriteItems")
  ? JSON.parse(localStorage.getItem("favouriteItems"))
  : [];

const intialState = {
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
  favourite: {
    favouriteItems: favourItemsFromLocalStorage,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
