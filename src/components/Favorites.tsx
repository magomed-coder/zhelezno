import { useCallback } from "react";
import { TOGGLE_FAVORITE, useGlobalState } from "../context/state";
import Card from "./Cards/Card";
import Grid from "./Grid/Grid";

const Favorites = () => {
  const {
    state: { favorites },
    dispatch,
  } = useGlobalState();

  const toggleFavorite = useCallback(
    (id: number, title: string, thumbnailUrl: string) => {
      dispatch({
        type: TOGGLE_FAVORITE,
        payload: { id, title, thumbnailUrl },
      });
    },
    [dispatch]
  );

  return (
    <div className="py-2">
      <h2>Избранное</h2>

      {favorites.length > 0 ? (
        <Grid>
          {favorites.map((item) => (
            <li key={item.id}>
              <Card
                thumbnailUrl={item.thumbnailUrl}
                title={item.title}
                id={item.id}
                isFavorite={favorites.some((fav) => fav.id === item.id)}
                onFavoriteToggle={toggleFavorite}
              />
            </li>
          ))}
        </Grid>
      ) : (
        <p className="py-1">Нет избранных предметов</p>
      )}
    </div>
  );
};

export default Favorites;
