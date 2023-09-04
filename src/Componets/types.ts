export interface CityField {
  name: string;
  value?: string
}

export interface CityOption {
  value: string;
  label: string
}

export interface FormData {
  [key: string]: CityOption;
}
