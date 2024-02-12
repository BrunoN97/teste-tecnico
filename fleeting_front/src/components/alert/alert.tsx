import * as React from "react";
import Alert from "@mui/material/Alert";
import { Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function SimpleAlert({ children, ...props }) {
  const [open, setOpen] = React.useState(true);
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          {...props}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {children}
        </Alert>
      </Collapse>
    </Box>
  );
}
