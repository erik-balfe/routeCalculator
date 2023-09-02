import React from 'react';
import s from './Main.module.scss';
import SearchForm from '../../Componets/SearchForm';

function MainPage() {
  return (
    <div className={s.root}>
      {/* Header here */}
      <div className={s.content}>
        <SearchForm />
      </div>
    </div>
  );
}

export default MainPage;
