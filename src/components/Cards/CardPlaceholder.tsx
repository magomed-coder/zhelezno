import styles from "./Card.module.scss";

const CardPlaceholder = () => {
  return (
    <div className={styles.card}>
      <div className={styles.square_container}>
        <div className={styles.square_skeleton}></div>
        <footer></footer>
      </div>
    </div>
  );
};

export default CardPlaceholder;
