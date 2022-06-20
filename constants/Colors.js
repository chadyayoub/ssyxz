let colorsLight = {
  main: '#2665ce',
  disabled: '#033289',
  label: '#777',
  cardBackground: '#fff',
  textInput: '#fcfcfc',
  textInputBorder: '#eee',
  inputColor: '#112',
  warningColor: '#ff8844',
  placeholder: '#888',
  buttonText: '#fff',
  header: '#2665ce',
  headerAction: '#fff',
  background: '#ddd',
};

let colorsDark = {
  main: '#2665ce',
  disabled: '#666',
  label: '#bbb',
  cardBackground: '#222',
  textInput: '#444',
  textInputBorder: '#555',
  inputColor: '#eee',
  warningColor: '#f66',
  placeholder: '#888',
  buttonText: '#fff',
  header: '#000',
  headerAction: '#fff',
  background: '#000',
};

export const setLightMode = () => {
  Colors = colorsLight;
};
export const setDarkMode = () => {
  Colors = colorsDark;
};

export let Colors = colorsLight;
//The app supports multiple themes and can easily be changed from within this file or from the user changing his device theme
