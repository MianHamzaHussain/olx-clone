import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from "./userReducers";
import {
  adCreateReducer,
  adDeleteReducer,
  adDetailsReducer,
  adFilterReducer,
  adSearchReducer,
  adUupdateReducer,
  ad_ListReducer,
} from "./adReducers";
import { favouriteReducer } from "./favouriteReducer";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  adsList: ad_ListReducer,
  adDetails: adDetailsReducer,
  adSearch: adSearchReducer,
  adFilter: adFilterReducer,
  adDelete: adDeleteReducer,
  adCreate: adCreateReducer,
  adUpdate: adUupdateReducer,
  favourite: favouriteReducer,
});
export default reducer;
