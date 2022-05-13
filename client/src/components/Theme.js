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
    allVariants: {
      color: "#244c5a"
    },
  },
});

export default Theme;
