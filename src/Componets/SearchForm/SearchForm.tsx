import { ROUTES } from 'Constants';
import { Link } from 'react-router-dom';
import React, {
  FormEvent, useCallback, useEffect, useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchCities } from 'Services/api';
import { useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import s from './SearchForm.scss';
import CitySelect from '../CitySelect';
import NumberSelect from '../NumberSelect';
import { CityOption } from '../CitySelect/CitySelect';

interface FormData {
  [key: string]: CityOption;
}

function SearchForm() {
  // todo add deep linking

  const { handleSubmit, control } = useForm<FormData>();
  const onSubmit = handleSubmit((data: FormData) => {
    const a = 'f';
    console.log('submitted form', data);
  });

  const prevent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const defaultCity: CityOption = { label: 'Nice', value: 'Nice' };

  return (
    <>
      <h1>search</h1>
      <hr />
      <form onSubmit={prevent}>
        <div className={s.left}>
          <CitySelect defaultValue={defaultCity} control={control} />
          <button type="submit" onClick={onSubmit}>Submit</button>

          <div className={s.rigth}>
            <div>Passengers</div>
            <NumberSelect defaultValue={2} control={control} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
            <div>Date</div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SearchForm;
