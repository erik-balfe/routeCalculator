import { ROUTES } from 'Constants';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../../Pages/Main';

function AppRoutes() {
  return (
    <Routes>
      <Route
        path={ROUTES.home}
        element={(
          <Main />
        )}
      />
    </Routes>
  );
}

export default AppRoutes;
