import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDebounce } from 'rooks';
import s from '../DateSelect.scss';

export interface Props {
  control: Control
  defaultValue?: dayjs.Dayjs;
}

const SEARCH_PARAM_KEY = 'date';

function DateSelect({ control, defaultValue = dayjs(new Date()) }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateInSearchParam = (value: dayjs.Dayjs) => {
    searchParams.set(SEARCH_PARAM_KEY, value.toString());
    setSearchParams(searchParams);
  };

  const updateSearchParamsDebounced = useDebounce(updateInSearchParam, 500);

  const removeSearchParam = () => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.delete(SEARCH_PARAM_KEY);
      return prevSearchParams;
    });
    const paramsString = searchParams.toString();
    const newUrl = paramsString ? `?${paramsString}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  };

  let selectedDate = dayjs(new Date());

  try {
    const dateFromSearchParams = searchParams.get(SEARCH_PARAM_KEY);
    if (dateFromSearchParams) {
      selectedDate = dayjs(dateFromSearchParams);
      if (!selectedDate.isValid()) throw Error(`Not valid date:\n\n${selectedDate}`);
      if (selectedDate.isBefore(dayjs())) {
        console.error('past date entered');
        throw new Error('past date entered');
      }
    }
  } catch (error) {
    console.error(`Error parsing "${SEARCH_PARAM_KEY}" from searchParams`, error);
    removeSearchParam();
    selectedDate = dayjs(new Date());
  }

  return (
    <div>
      <Controller
        control={control}
        name="date"
        defaultValue={defaultValue}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              {...field}
              value={selectedDate}
              onChange={((newDate) => {
                field.onChange(newDate);
                updateSearchParamsDebounced(dayjs(newDate));
              })}
            />
          </LocalizationProvider>
        )}
      />
    </div>
  );
}

export default DateSelect;
