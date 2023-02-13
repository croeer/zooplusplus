import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Stack } from "@mui/material";
import ApiHealthCheck from "./ApiHealthCheck";

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "20vh",
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          py: 0,
          px: 0,
          mt: "auto",
        }}
      >
        <Stack direction="row" justifyContent="right">
          <ApiHealthCheck />
        </Stack>
      </Box>
    </Box>
  );
}
