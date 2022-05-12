import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  typography: {
    fontFamily: [
      "Lato",
      "Futura",
      "Sofia",
      "Roboto",
      "san-serif"
    ].join(","),
  },
  components: {
    IngredientSearch: {
      styleOverrides: {
        root: {
          backgroundColor: 'black',
        },
      },
    },
  },
});

export default Theme;
