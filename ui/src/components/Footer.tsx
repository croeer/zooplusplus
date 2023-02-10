import React, { FC, ReactElement } from "react";
import { Paper, Stack } from "@mui/material";
import ApiHealthCheck from "./ApiHealthCheck";

export const Footer: FC = (): ReactElement => {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={0}
    >
      <Stack direction="row" justifyContent="right">
        <ApiHealthCheck />
      </Stack>
    </Paper>
  );
};

export default Footer;
