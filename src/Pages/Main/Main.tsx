import React from 'react';
import s from './Main.module.scss';
import CitySelect from '../../Componets/CitySelect';

function MainPage() {
  return (
    <div className={s.root}>
      {/* Header here */}
      <div className={s.content}>
        <CitySelect />
      </div>
    </div>
  );
}

export default MainPage;
