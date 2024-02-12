import { forwardRef } from "react";
import { TextField } from "@mui/material";

import styles from "./inputModal.module.css";

const TextFieldModal = forwardRef(({ ...props }, ref) => {
  return (
    <TextField
      required
      id="outlined-basic"
      variant="outlined"
      className={styles.inputModal}
      inputRef={ref}
      {...props}
    />
  );
});

export default TextFieldModal;
