import React, { useEffect } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import AppRoutes from './Componets/Router';
import './globalStyles.scss';
import s from './App.module.scss';
import { searchCities, fetchDistance } from './services/api';
// import fonts here
const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const search = async () => {
      const cities = await searchCities('n');
    };
    search();
  }, []);

  useEffect(() => {
    const getDistance = async () => {
      const distance = await fetchDistance(['Nice', 'Nantes']);
    };
    getDistance();
  }, []);

  return (
    <div className={s.root} id="app">
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </div>
  );
}

export default App;
