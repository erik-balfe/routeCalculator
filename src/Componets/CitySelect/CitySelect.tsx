import { ROUTES } from 'Constants';
import { Link } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchCities } from 'Services/api';
import Select from 'react-select';
import { useDebounce } from 'rooks';
import s from './Card.module.scss';

function CitySelect() {
  // todo add deep linking
  const [searchString, setSearchString] = useState('');
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const reFetchData = useCallback((inputValue: string) => {
    console.log('search', inputValue);
    setSearchString(inputValue);
  }, []);
  const setSearchDebounced = useDebounce(reFetchData, 500);

  const { data: cities, isError, isFetching } = useQuery(['searchCities', searchString], searchCities);

  const options = cities?.map((item) => ({ label: item, value: item }));

  const selectOption = (value: { value: string, label: string } | null) => {
    const newValue = value?.value || null;
    setSelectedValue(newValue);
  };

  useEffect(() => {
    if (isError) {
      // toast('something went wrong. Try again later');
    }
  }, [isError]);

  return (
    <>
      <h1>search</h1>
      <hr />
      <Select
        className="basic-single"
        classNamePrefix="select"
        placeholder="Select a city"
        // defaultValue={} // default value from search params
        isDisabled={false}
        isLoading={isFetching}
        isClearable
        name="color"
        options={options}
        onInputChange={setSearchDebounced}
        onChange={selectOption}
        noOptionsMessage={() => (isError ? 'Some error has occurred, try again' : 'No results')}
      />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      {isFetching && 'fetching results...'}
      {isError && (
        <p>
          something went wrong. Try searching again
        </p>
      )}
    </>
  );
}

export default CitySelect;
