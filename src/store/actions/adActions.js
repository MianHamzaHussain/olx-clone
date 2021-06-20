import {
  Ad_Delete_Fail,
  Ad_Delete_Request,
  Ad_Delete_Success,
  Ad_Detail_Fail,
  Ad_Detail_Request,
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
import { db } from "../../config/firebase";
export const listAds = () => async (dispatch) => {
  try {
    dispatch({ type: Ad_List_Request });
    const data = await db.collection("adds").get();
    let ads = [];
    data.forEach((doc) => {
      let ad = doc.data();
      ad = { ...ad, id: doc.id };
      ads.push(ad);
    });

    dispatch({ type: Ad_List_Success, payload: ads });
  } catch (error) {
    dispatch({
      type: Ad_List_Fail,
      payload: error.code && error.message ? error.message : error.code,
    });
  }
};
export const listAdDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: Ad_Detail_Request });
    const doc = await db.collection("adds").doc(id).get();
    // console.log(doc);

    dispatch({ type: Ad_Detail_Success, payload: doc.data() });
  } catch (error) {
    dispatch({
      type: Ad_Detail_Fail,
      payload: error,
    });
  }
};
export const listSearchAds = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: Ad_Search_Reset });
    dispatch({ type: Ad_Search_Request });
    const data = await db.collection("adds").orderBy("name").get();
    let ads = [];
    data.forEach((doc) => {
      let ad = doc.data();
      ad = { ...ad, id: doc.id };
      ads.push(ad);
    });
    let tr = ads;
    let fa = [];

    let re = new RegExp(`${keyword}`);
    tr.map((fad) => fad.name.search(re) > -1 && fa.push(fad));

    dispatch({ type: Ad_Search_Success, payload: fa });
  } catch (error) {
    dispatch({
      type: Ad_Search_Fail,
      payload: error.code && error.message ? error.message : error.code,
    });
  }
};
export const listFilterAds = (filter) => async (dispatch) => {
  try {
    dispatch({ type: Ad_Filter_Reset });
    dispatch({ type: Ad_Filter_Request });
    const ftype = filter.split("=")[0];
    const fvalue = filter.split("=")[1];
    let data = null;
    if (ftype == "cat") {
      data = await db
        .collection("adds")

        .where("category", "==", fvalue)

        .get();
    } else {
      data = await db
        .collection("adds")
        .where("uid", "==", fvalue)

        .get();
    }
    let ads = [];
    data.forEach((doc) => {
      let ad = doc.data();
      ad = { ...ad, id: doc.id };
      ads.push(ad);
    });

    dispatch({ type: Ad_Filter_Success, payload: ads });
  } catch (error) {
    dispatch({
      type: Ad_Filter_Fail,
      payload: error.code && error.message ? error.message : error.code,
    });
  }
};
export const deleteAd = (id, data) => async (dispatch) => {
  try {
    console.log("calling");
    dispatch({ type: Ad_Delete_Request });
    await db.collection("adds").doc(id).delete();

    dispatch({ type: Ad_Delete_Success });
    const ads = data.filter((ad) => ad.id !== id);
    dispatch({ type: Ad_Filter_Success, payload: ads });
  } catch (error) {
    dispatch({
      type: Ad_Delete_Fail,
      payload: error,
    });
  }
};
