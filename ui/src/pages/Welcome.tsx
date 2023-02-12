import React from "react";
import { Grid, Typography, Button, Box, Container, Stack } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router";

const Welcome = () => {
  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Zooplusplus
        </Typography>
        <Typography
          component="h3"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Rechnungen einfach managen
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Upload und Verwaltung offener Rechnungen, Generierung von QR-Codes zum
          direkten &Uuml;berweisen
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" onClick={() => keycloak.login()}>
            Login
          </Button>
          <Button variant="contained" onClick={() => navigate("/upload")}>
            Rechnungs-Upload
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Welcome;
