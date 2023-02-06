import './App.css';
// @ts-ignore  
import keycloak from './keycloak';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { AppRouter } from './components/AppRouter';
import React from 'react';

function App() {

  return (
    <div className="App">
      <ReactKeycloakProvider authClient={keycloak}>
      <React.StrictMode>
      <AppRouter />
      </React.StrictMode>
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;
