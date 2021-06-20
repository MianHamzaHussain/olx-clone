import {
  userLoginFail,
  userLoginRequest,
  userLoginSuccess,
  userLogout,
  userRegisterFail,
  userRegisterRequest,
  userRegisterSuccess,
} from "../constants/userConstants";
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case userLoginRequest:
      return {
        loading: true,
      };
    case userLoginSuccess:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case userLoginFail:
      return {
        loading: false,
        error: action.payload,
      };
    case userLogout:
      return {};
    default:
      return state;
  }
};
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userRegisterRequest:
      return {
        loading: true,
      };
    case userRegisterSuccess:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case userRegisterFail:
      return {
        loading: false,
        error: action.payload,
      };
    case userLogout:
      return {};
    default:
      return state;
  }
};
