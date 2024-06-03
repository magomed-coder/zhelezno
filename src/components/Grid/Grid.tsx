import React from "react";
import styles from "./Grid.module.scss";

interface GridProps {
  children: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({ children }) => {
  return <ul className={styles.grid}>{children}</ul>;
};

export default Grid;
