import { useKeycloak } from '@react-keycloak/web';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';


export const AppRouter = () => {
    const { initialized } = useKeycloak();

    if (!initialized) {
      return <div>Loading...</div>
    }
    return (<>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
    );
};