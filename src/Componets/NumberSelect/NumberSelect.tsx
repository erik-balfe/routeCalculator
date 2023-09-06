import React from 'react';
import { Control, Controller } from 'react-hook-form';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {
  Unstable_NumberInput as MuiNumberInput,
} from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import { useSearchParams } from 'react-router-dom';
import s from '../NumberSelect.scss';

export interface Props {
  defaultValue?: number;
  control: Control
}

const blue = {
  100: '#daecff',
  200: '#b6daff',
  300: '#66b2ff',
  400: '#3399ff',
  500: '#007fff',
  600: '#0072e5',
  800: '#004c99',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`,
);

const StyledInput = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  border-radius: 4px;
  margin: 0 4px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 0;
  border-radius: 999px;
  color: ${theme.palette.mode === 'dark' ? blue[300] : blue[600]};
  background: transparent;

  width: 40px;
  height: 40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? blue[800] : blue[100]};
    cursor: pointer;
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`,
);

const SEARCH_PARAM_KEY = 'passengersCount';

function NumberSelect({ control, defaultValue = 1 }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateInSearchParam = (value: number) => {
    searchParams.set(SEARCH_PARAM_KEY, String(value));
    setSearchParams(searchParams);
  };

  const removeSearchParam = () => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.delete(SEARCH_PARAM_KEY);
      return prevSearchParams;
    });
    const paramsString = searchParams.toString();
    const newUrl = paramsString ? `?${paramsString}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  };

  let selectedValue = 1;

  try {
    const passengersCountFromSearchParams = searchParams.get(SEARCH_PARAM_KEY);
    if (passengersCountFromSearchParams) {
      selectedValue = JSON.parse(passengersCountFromSearchParams);
    }
  } catch (error) {
    console.error(`Error parsing "${SEARCH_PARAM_KEY}" from searchParams`, error);
    removeSearchParam();
    selectedValue = 1;
  }

  return (
    <div>
      <Controller
        control={control}
        name="passengersCount"
        defaultValue={defaultValue}
        render={({ field }) => (
          <MuiNumberInput
            slots={{
              root: StyledInputRoot,
              input: StyledInput,
              incrementButton: StyledButton,
              decrementButton: StyledButton,
            }}
            slotProps={{
              incrementButton: {
                children: <AddIcon />,
                className: 'increment',
              },
              decrementButton: {
                children: <RemoveIcon />,
              },
            }}
            min={1}
            value={selectedValue}
            onChange={(event, newValue) => {
              if (!newValue) return;
              field.onChange(newValue);
              updateInSearchParam(newValue);
            }}
          />
        )}
      />
    </div>
  );
}

export default NumberSelect;
