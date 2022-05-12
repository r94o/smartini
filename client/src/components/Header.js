import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import LiquorTwoToneIcon from '@mui/icons-material/LiquorTwoTone';
import WineBarTwoToneIcon from '@mui/icons-material/WineBarTwoTone';
import SmartiniLogo from './SmartiniLogo';

const Header = () => {

  return (
    <header>
      <AppBar position="static" sx={{ backgroundColor: "cadetBlue", m: 0 }}>
        <Toolbar>
          <IconButton size="large" edge="start">
            <SmartiniLogo height="30px" />
          </IconButton>
          <Typography variant="h6" component="div">
            smartini
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  )



}

export default Header;