import { useKeycloak } from "@react-keycloak/web";

import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { MyAccount } from "../pages/MyAccount";

export const AppRouter = () => {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/account" element={<MyAccount />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
