import React, {
  FormEvent,
} from 'react';
import { useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import s from './SearchForm.scss';
import CitySelectGroup from '../CitySelectGroup';
import NumberSelect from '../NumberSelect';
import { FormData } from '../types';

function SearchForm() {
  const { handleSubmit, control } = useForm<FormData>();
  const onSubmit = handleSubmit((data: FormData) => {
    console.log('submitted form', data);
  });

  const prevent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <h1>search</h1>
      <form onSubmit={prevent}>
        <div className={s.left}>
          <CitySelectGroup control={control} />
          <div className={s.rigth}>
            <div>Passengers</div>
            <NumberSelect control={control} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
            <div>Date</div>
            <button type="submit" onClick={onSubmit}>Submit</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default SearchForm;
