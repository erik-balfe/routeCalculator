import { ROUTES } from 'Constants';
import { Link } from 'react-router-dom';
import React from 'react';
import s from './Card.module.scss';

function MyComponent() {
  return (
    <Link to={ROUTES.home} className={s.root}>
      something
    </Link>
  );
}

export default MyComponent;
