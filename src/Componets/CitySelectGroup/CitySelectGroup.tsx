import { useSearchParams } from 'react-router-dom';
import React from 'react';
import { Control } from 'react-hook-form';
import s from './CitySelectGroup.scss';
import CitySelect from '../CitySelect';
import { CityField, CityOption } from '../types';

export interface Props {
  control: Control
}

function CitySelectGroup({ control }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultCities: CityField[] = [
    { name: 'origin' },
    { name: 'destination-1' },
  ];
  let selectedCities: CityField[] = defaultCities;
  const updateSearchParams = (selected: CityField[]) => {
    setSearchParams({ selectedCities: JSON.stringify(selected) });
  };
  const removeCitiesFromSearchParams = () => {
    searchParams.delete('selectedCities');
    const paramsString = searchParams.toString();
    const newUrl = paramsString ? `?${paramsString}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  };
  try {
    const citiesFromParams = searchParams.get('selectedCities');
    if (citiesFromParams) {
      selectedCities = JSON.parse(citiesFromParams);
    }
  } catch (error) {
    console.error('Error parsing selectedCities from searchParams', error);
    removeCitiesFromSearchParams();
    selectedCities = defaultCities;
  }

  const addField = () => {
    const lastDestination = selectedCities.at(-1)?.name || '';
    const newNum = +(lastDestination.split('-')[1]) + 1;
    updateSearchParams([...selectedCities, { name: `destination-${newNum}` }]);
  };

  const removeField = (name: CityField['name']) => {
    updateSearchParams(selectedCities.filter((item: CityField) => item.name !== name));
  };

  const updateField = (name: CityField['name'], updatedItem: CityOption['value'] | undefined) => {
    updateSearchParams(selectedCities.map((item: CityField) => {
      if (item.name === name) {
        return { ...item, value: updatedItem };
      }
      return item;
    }));
  };

  return (
    <div className={s.root}>
      {selectedCities.map((field, index) => {
        console.log('updated', field.name, field.value);
        return (
          <CitySelect
            key={field.name}
            control={control}
            name={field.name}
            value={selectedCities[index].value}
            label={index === 0 ? 'City of origin' : 'City of destination'}
            removable={index > 1}
            onChange={(selectedOption) => {
              updateField(field.name, selectedOption);
            }}
            onRemoveField={removeField}
          />
        );
      })}
      <button type="button" onClick={addField}>Add destination</button>
    </div>
  );
}

export default CitySelectGroup;
