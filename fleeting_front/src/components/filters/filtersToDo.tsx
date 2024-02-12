import { TextField } from "@mui/material";
import styles from "./filtersToDo.module.css";
import React from "react";

const FiltersToDo = React.forwardRef((props, ref) => {
  return (
    <TextField
      id="standard-basic"
      variant="standard"
      className={styles.input}
      ref={ref}
      {...props}
    ></TextField>
  );
});

export default FiltersToDo;
