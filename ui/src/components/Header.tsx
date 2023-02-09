import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Login from "@mui/icons-material/Login";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useKeycloak } from "@react-keycloak/web";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

export default function Header() {
  const { keycloak, initialized } = useKeycloak();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Zooplusplus
          </Typography>
          {keycloak.authenticated && (
            <div>
              <Button
                variant="contained"
                disableElevation
                endIcon={<AccountCircle />}
                onClick={handleMenu}
              >
                {keycloak.tokenParsed?.preferred_username}
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={() => navigate("/account")}>
                  My account
                </MenuItem>
                <MenuItem onClick={() => keycloak.logout()}>Logout</MenuItem>
              </Menu>
            </div>
          )}
          {!keycloak.authenticated && (
            <div>
              <Button
                variant="contained"
                disableElevation
                endIcon={<Login />}
                onClick={() => keycloak.login()}
              >
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
