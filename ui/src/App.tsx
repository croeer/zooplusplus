import "./App.css";
import { AppRouter } from "./components/AppRouter";
import React, { createContext, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

export const ApiContext = createContext(null as any);

function App() {
  const [apiConnected, setApiConnected] = useState<boolean>(false);

  return (
    <div className="App">
      <React.StrictMode>
        <ApiContext.Provider value={{ apiConnected, setApiConnected }}>
          <AppRouter />
          <Footer />
        </ApiContext.Provider>
      </React.StrictMode>
    </div>
  );
}

export default App;
