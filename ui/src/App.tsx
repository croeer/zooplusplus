import "./App.css";
// @ts-ignore
import keycloak from "./keycloak";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { AppRouter } from "./components/AppRouter";
import React, { createContext, useState } from "react";
import Footer from "./components/Footer";

export const ApiContext = createContext(null as any);

function App() {
  const [apiConnected, setApiConnected] = useState<boolean>(false);

  return (
    <div className="App">
      <ReactKeycloakProvider authClient={keycloak}>
        <React.StrictMode>
          <ApiContext.Provider value={{ apiConnected, setApiConnected }}>
            <AppRouter />
            <Footer />
          </ApiContext.Provider>
        </React.StrictMode>
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;
