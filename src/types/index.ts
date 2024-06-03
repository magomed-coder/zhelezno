export interface Item {
  id: number;
  title: string;
  thumbnailUrl: string;
}

export interface ListState {
  items: Item[];
  page: number;
  hasMore: boolean;
}

export interface GlobalState {
  favorites: Item[];
  listState: ListState;
  scrollPositions: { [key: string]: number };
}

export type Action =
  | { type: "ADD_FAVORITE"; payload: Item }
  | { type: "REMOVE_FAVORITE"; payload: Item }
  | { type: "TOGGLE_FAVORITE"; payload: Item }
  | { type: "SET_LIST_STATE"; payload: Partial<ListState> }
  | {
      type: "SET_SCROLL_POSITION";
      payload: { routePath: string; scrollPosition: number };
    };
