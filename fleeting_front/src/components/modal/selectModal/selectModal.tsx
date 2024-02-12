import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const SelectLabels = React.forwardRef(({ onChange, ...props }, ref) => {
  const [status, setStatus] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 223 }}>
        <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Status"
          onChange={handleChange}
          value={status}
          inputRef={ref}
          {...props}
        >
          <MenuItem value={"to-do"}>To-Do</MenuItem>
          <MenuItem value={"doing"}>Doing</MenuItem>
          <MenuItem value={"done"}>Done</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
});

export default SelectLabels;
