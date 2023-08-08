import { useKeycloak } from "@react-keycloak/web";

import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { MyAccount } from "../pages/MyAccount";
import { Upload } from "../pages/Upload";
import Header from "./Header";

export const AppRouter = () => {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
