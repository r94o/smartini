import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  typography: {
    fontFamily: [
      "Futura",
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