import React from "react";
import { Grid, Typography, Button, Box, Container, Stack } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";

const Welcome = () => {
  const { keycloak, initialized } = useKeycloak();

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
          Album layout
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don&apos;t simply skip over it entirely.
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
        </Stack>
      </Container>
    </Box>
  );
};

export default Welcome;
