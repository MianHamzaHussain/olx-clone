import {
  userLoginFail,
  userLoginRequest,
  userLoginSuccess,
  userLogout,
  userRegisterFail,
  userRegisterRequest,
  userRegisterSuccess,
} from "../constants/userConstants";
import { auth } from "../../config/firebase";
export const register = (name, mail, password) => async (dispatch) => {
  try {
    dispatch({
      type: userRegisterRequest,
    });
    const newUser = await auth.createUserWithEmailAndPassword(mail, password);
    console.log("user", newUser.user);

    if (!newUser.user.displayName) {
      await newUser.user.updateProfile({ displayName: name });
    }
    const { uid, email, displayName } = newUser.user;
    let data = { uid, email, displayName };
    dispatch({
      type: userRegisterRequest,
      payload: data,
    });
    dispatch({
      type: userRegisterSuccess,
      payload: data,
    });
    dispatch({
      type: userLoginSuccess,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userRegisterFail,

      payload: error.code && error.message ? error.message : error.code,
    });
  }
};
export const login = (mail, password) => async (dispatch) => {
  try {
    dispatch({
      type: userLoginRequest,
    });
    const { user } = await auth.signInWithEmailAndPassword(mail, password);
    const { displayName, email, uid } = user;
    const data = {
      displayName,
      email,
      uid,
    };
    dispatch({
      type: userLoginSuccess,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userLoginFail,
      payload: error.code && error.message ? error.message : error.code,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: userLogout });
};
