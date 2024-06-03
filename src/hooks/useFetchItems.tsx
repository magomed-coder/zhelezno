import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { SET_LIST_STATE, useGlobalState } from "../context/state";

const BASE_URL = "https://jsonplaceholder.typicode.com";
const ITEMS_PER_PAGE = 10;

const instance = axios.create({
  baseURL: BASE_URL,
});

const useFetchItems = () => {
  const { state, dispatch } = useGlobalState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { page, items, hasMore } = state.listState;

  const loadItems = useCallback(
    async (page: number = 1) => {
      if (loading) return;
      setLoading(true);

      try {
        const response = await instance.get(`/albums/1/photos`, {
          params: {
            _page: page,
            _limit: ITEMS_PER_PAGE,
          },
        });

        if (page === 1) {
          dispatch({
            type: SET_LIST_STATE,
            payload: {
              items: response.data,
            },
          });
        } else {
          dispatch({
            type: SET_LIST_STATE,
            payload: {
              items: [...items, ...response.data],
            },
          });
        }

        if (response.data.length < ITEMS_PER_PAGE) {
          dispatch({
            type: SET_LIST_STATE,
            payload: {
              hasMore: false,
            },
          });
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [dispatch, items, loading]
  );

  useEffect(() => {
    if (hasMore) {
      loadItems(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return { loading, error, loadItems };
};

export default useFetchItems;
