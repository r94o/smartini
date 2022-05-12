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
            <SmartiniLogo size="200px" />
            <LiquorTwoToneIcon />
            <WineBarTwoToneIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Smartini
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  )



}

export default Header;