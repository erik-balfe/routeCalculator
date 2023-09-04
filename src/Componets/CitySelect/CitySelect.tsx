import { ROUTES } from 'Constants';
import { Link } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchCities } from 'Services/api';
import Select from 'react-select';
import { useDebounce } from 'rooks';
import { Controller, Control } from 'react-hook-form';
import s from './CitySelect.scss';
import { CityField } from '../types';

export interface Props {
  onChange: (newOptionValue?: string) => void
  name: CityField['name'],
  onRemoveField: (name: CityField['name']) => void
  value?: CityField['value'];
  label: string;
  removable?: boolean
  control: Control
}

function CitySelect({
  label, removable, onRemoveField, onChange, value, name, control,
}: Props) {
  const [searchString, setSearchString] = useState('');

  const reFetchData = useCallback((inputValue: string) => {
    setSearchString(inputValue);
  }, []);
  const setSearchDebounced = useDebounce(reFetchData, 500);

  const { data: cities, isError, isFetching } = useQuery(['searchCities', searchString], searchCities);

  const options = cities?.map((item) => ({ label: item, value: item })) || [];

  useEffect(() => {
    if (isError) {
      // toast('something went wrong. Try again later');
    }
  }, [isError]);

  const handleRemoveButton = () => {
    onRemoveField(name);
  };

  return (
    <div className={s.root}>
      <div>
        {label}
      </div>
      <div>
        {removable && (
        <button type="button" onClick={handleRemoveButton}>
          remove
        </button>
        )}
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field: fieldProps }) => (
          <Select
            {...fieldProps}
            onChange={(newValue) => {
              fieldProps.onChange(newValue);
              onChange(newValue?.value);
            }}
            value={value ? {
              value: value || '',
              label: value,
            } : undefined}
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select a city"
            isDisabled={false}
            isLoading={isFetching}
            isClearable
            options={options}
            onInputChange={setSearchDebounced}
            noOptionsMessage={() => (isError ? 'Some error has occurred, try again' : 'No results')}
          />
        )}
      />
    </div>
  );
}

export default React.memo(CitySelect);
