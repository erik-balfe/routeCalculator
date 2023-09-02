import { ROUTES } from 'Constants';
import { Link } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchCities } from 'Services/api';
import Select from 'react-select';
import { useDebounce } from 'rooks';
import { useForm, Controller, Control } from 'react-hook-form';
import s from './CitySelect.scss';

interface Field {
  name: string;
  value: string
}

export interface CityOption {
  value: string;
  label: string
}

export interface Props {
  control: Control,
  defaultValue: CityOption;
}

function CitySelect({ control, defaultValue }: Props) {
  // todo add deep linking
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

  const [fields, setFields] = useState<Field[]>([{
    name: 'origin',
    value: 'Angers',
  }, {
    name: 'destination-1',
    value: 'Angers',
  }]);

  const addField = () => {
    setFields((prevFields) => {
      const lastDestination = prevFields.at(-1)?.name || '';
      const newNum = +(lastDestination.split('-')[1]) + 1;
      return [
        ...prevFields,
        { name: `destination-${newNum}`, value: 'c' },
      ];
    });
  };

  const removeField = (name: string) => {
    setFields((prevFields) => prevFields.filter((item) => item.name !== name));
  };

  return (
    <div className={s.root}>
      {fields.map((field, index) => (
        <div key={field.name}>
          {index === 0 && (
            <div>
              City of origin
            </div>
          )}
          {index > 0 && (
            <div>
              City of destination
              {index > 1 && (
              <button type="button" onClick={() => removeField(field.name)}>
                remove
              </button>
              )}
            </div>
          )}
          <Controller
            name={field.name}
            control={control}
            defaultValue={defaultValue}
            render={({ field: fieldProps }) => (
              <Select
                {...fieldProps}
                onChange={fieldProps.onChange}
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
      ))}
      <button type="button" onClick={addField}>Add destination</button>
    </div>
  );
}

export default CitySelect;
