import {
  Ad_Create_Fail,
  Ad_Create_Request,
  Ad_Create_Reset,
  Ad_Create_Success,
  Ad_Delete_Fail,
  Ad_Delete_Request,
  Ad_Delete_Success,
  Ad_Detail_Fail,
  Ad_Detail_Request,
  Ad_Detail_Reset,
  Ad_Detail_Success,
  Ad_Filter_Fail,
  Ad_Filter_Request,
  Ad_Filter_Reset,
  Ad_Filter_Success,
  Ad_List_Fail,
  Ad_List_Request,
  Ad_List_Success,
  Ad_Search_Fail,
  Ad_Search_Request,
  Ad_Search_Reset,
  Ad_Search_Success,
} from "../constants/adConstants";
export const ad_ListReducer = (state = { ads: [] }, action) => {
  switch (action.type) {
    case Ad_List_Request:
      return {
        loading: true,
        ads: [],
      };
    case Ad_List_Success:
      return {
        loading: false,
        ads: action.payload,
      };
    case Ad_List_Fail:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const adDetailsReducer = (state = { ad: {} }, action) => {
  switch (action.type) {
    case Ad_Detail_Request:
      return {
        ...state,
        loading: true,
      };
    case Ad_Detail_Success:
      return {
        loading: false,
        ad: action.payload,
      };
    case Ad_Detail_Fail: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    case Ad_Detail_Reset: {
      return {
        loading: false,
        ad: {},
      };
    }
    default:
      return state;
  }
};
export const adSearchReducer = (state = { ads: [] }, action) => {
  switch (action.type) {
    case Ad_Search_Request:
      return {
        loading: true,
        ads: [],
      };
    case Ad_Search_Success:
      return {
        loading: false,
        ads: action.payload,
      };
    case Ad_Search_Fail:
      return {
        loading: false,
        error: action.payload,
      };
    case Ad_Search_Reset:
      return {
        ads: [],
      };
    default:
      return state;
  }
};
export const adFilterReducer = (state = { ads: [] }, action) => {
  switch (action.type) {
    case Ad_Filter_Request:
      return {
        loading: true,
        ads: [],
      };
    case Ad_Filter_Success:
      return {
        loading: false,
        ads: action.payload,
      };
    case Ad_Filter_Fail:
      return {
        loading: false,
        error: action.payload,
      };
    case Ad_Filter_Reset:
      return {
        ads: [],
      };
    default:
      return state;
  }
};
export const adDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case Ad_Delete_Request:
      return {
        loading: true,
      };
    case Ad_Delete_Success:
      return {
        loading: false,
        success: true,
      };
    case Ad_Delete_Fail:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const adCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case Ad_Create_Request:
      return {
        loading: true,
      };
    case Ad_Create_Success:
      return {
        loading: false,
        success: true,
      };
    case Ad_Create_Fail:
      return {
        loading: false,
        error: action.payload,
      };
    case Ad_Create_Reset: {
      return {};
    }
    default:
      return state;
  }
};
