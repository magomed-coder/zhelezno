import { useCallback, useEffect, useRef } from "react";
import Card from "../components/Cards/Card";
import Grid from "../components/Grid/Grid";
import LinkButton from "../components/ListButton";
import CardPlaceholder from "../components/Cards/CardPlaceholder";
import {
  SET_LIST_STATE,
  SET_SCROLL_POSITION,
  TOGGLE_FAVORITE,
  useGlobalState,
} from "../context/state";

import useFetchItems from "../hooks/useFetchItems";
import useScroll from "../hooks/useInfiniteScroll";
import { useLocation } from "react-router-dom";
import useScrollPosition from "../hooks/useScrollPosition";

const List = () => {
  const { pathname } = useLocation();
  const scrollY = useScrollPosition();
  const targetRef = useRef<HTMLButtonElement | null>(null);
  const { state, dispatch } = useGlobalState();
  const { loading } = useFetchItems();
  const {
    listState: { items, hasMore, page },
    scrollPositions,
  } = state;

  useEffect(() => {
    window.scrollTo(0, scrollPositions[pathname]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch({
      type: SET_SCROLL_POSITION,
      payload: {
        routePath: pathname,
        scrollPosition: +scrollY,
      },
    });
  }, [dispatch, pathname, scrollY]);

  const handleLoadMore = useCallback(() => {
    dispatch({
      type: SET_LIST_STATE,
      payload: {
        page: page + 1,
      },
    });
  }, [dispatch, page]);

  const toggleFavorite = useCallback(
    (id: number, title: string, thumbnailUrl: string) => {
      dispatch({
        type: TOGGLE_FAVORITE,
        payload: { id, title, thumbnailUrl },
      });
    },
    [dispatch]
  );

  useScroll({ targetRef, loadMore: handleLoadMore, loading });

  const isLoading = loading && page === 1 && items.length == 0;

  return (
    <section className="py-3">
      <h1>Список</h1>
      <p>Список с товарами!</p>
      <div className="py-1">
        <LinkButton route="/">Дашборд</LinkButton>
      </div>
      <div className="py-2">
        <Grid>
          {isLoading ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <li key={index}>
                  <CardPlaceholder />
                </li>
              ))}
            </>
          ) : (
            items.map((item) => (
              <li key={item.id}>
                <Card
                  thumbnailUrl={item.thumbnailUrl}
                  title={item.title}
                  id={item.id}
                  isFavorite={state.favorites.some((fav) => fav.id === item.id)}
                  onFavoriteToggle={toggleFavorite}
                />
              </li>
            ))
          )}
        </Grid>
      </div>
      <div className="py-2 text-center">
        {hasMore ? (
          <button onClick={handleLoadMore} disabled={loading} ref={targetRef}>
            {loading ? "Загрузка..." : "Загрузить"}
          </button>
        ) : (
          <p>Все товары загружены</p>
        )}
      </div>
    </section>
  );
};

export default List;
