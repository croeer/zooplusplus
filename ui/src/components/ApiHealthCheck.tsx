import { Chip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../App";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import { Cloud } from "@mui/icons-material";

export default function ApiHealthCheck() {
  const { apiConnected, setApiConnected } = useContext(ApiContext);

  useEffect(() => {
    const healthUrl = `${process.env.REACT_APP_BACKEND_URL}/api/health`;
    console.log("fetching " + healthUrl);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/config`, {
      method: "GET",
    })
      .then((data) => {
        setApiConnected(true);
      })
      .catch((err) => {
        setApiConnected(false);
      });
  }, []);

  return (
    <>
      {apiConnected && (
        <div>
          <Chip icon={<Cloud />} label="Connected" color="success" />
        </div>
      )}
      {!apiConnected && (
        <div>
          <Chip icon={<CloudOffIcon />} label="Not connected" color="error" />
        </div>
      )}
    </>
  );
}
