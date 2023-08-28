import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import AppRoutes from './Componets/Router';
import './globalStyles.scss';
import s from './App.module.scss';
// import fonts here
const queryClient = new QueryClient();

function App() {
  return (
    <div className={s.root} id="app">
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </div>
  );
}

export default App;
