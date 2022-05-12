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
  styleOverrides: {
    root: {
      color: "red",
    }
  },
});

export default Theme;