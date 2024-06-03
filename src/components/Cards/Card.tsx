import { FC, memo } from "react";
import styles from "./Card.module.scss";
import { Item } from "../../types";

export interface CardProps extends Item {
  isFavorite: boolean;
  onFavoriteToggle: (id: number, title: string, thumbnailUrl: string) => void;
}

const Card: FC<CardProps> = memo(
  ({ thumbnailUrl, title, id, isFavorite, onFavoriteToggle }) => {
    const handleToggleFavorites = () => {
      onFavoriteToggle(id, title, thumbnailUrl);
    };

    return (
      <div className={styles.card}>
        <div>
          <img src={thumbnailUrl} alt="course image" />
        </div>
        <footer>
          <h2>{title}</h2>
          <div>
            <p>ID: {id}</p>
            <button onClick={handleToggleFavorites}>
              {isFavorite ? "Удалить" : "Добавить"}
            </button>
          </div>
        </footer>
      </div>
    );
  }
);

export default Card;
