import {
  Favourite_Clear_Items,
  Favourite_Item_Add,
  Favourite_Item_Remove,
} from "../constants/favourite";
export const favouriteReducer = (state = { favouriteItems: [] }, action) => {
  switch (action.type) {
    case Favourite_Item_Add:
      const item = action.payload;

      const existItem = state.favouriteItems.find((x) => x.id === item.id);

      if (existItem) {
        return {
          ...state,
          favouriteItems: state.favouriteItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          favouriteItems: [...state.favouriteItems, item],
        };
      }
    case Favourite_Item_Remove:
      return {
        ...state,
        favouriteItems: state.favouriteItems.filter(
          (x) => x.id !== action.payload
        ),
      };

    case Favourite_Clear_Items:
      return {
        ...state,
        favouriteItems: [],
      };
    default:
      return state;
  }
};
