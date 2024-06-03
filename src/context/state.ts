import { createContext, useContext, Dispatch } from "react";
import { GlobalState, Action } from "../types";

export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const SET_LIST_STATE = "SET_LIST_STATE";

export const initialState: GlobalState = {
  favorites: [],
  listState: {
    items: [],
    page: 1,
    hasMore: true,
  },
};

export const GlobalStateContext = createContext<
  | {
      state: GlobalState;
      dispatch: Dispatch<Action>;
    }
  | undefined
>(undefined);

export const globalStateReducer = (
  state: GlobalState,
  action: Action
): GlobalState => {
  let isFavorite: boolean;

  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    case TOGGLE_FAVORITE:
      isFavorite = state.favorites.some(
        (item) => item.id === action.payload.id
      );
      if (isFavorite) {
        return {
          ...state,
          favorites: state.favorites.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      } else {
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      }

    case SET_LIST_STATE:
      return {
        ...state,
        listState: {
          ...state.listState,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
