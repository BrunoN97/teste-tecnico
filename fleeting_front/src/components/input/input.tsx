import styles from "./input.module.css";
import React from "react";

const Input = React.forwardRef((props, ref) => {
  return <input className={styles.input} ref={ref} {...props} />;
});

export default Input;
