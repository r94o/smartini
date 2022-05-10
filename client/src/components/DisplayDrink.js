import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ListItemIcon from '@mui/material/ListItemIcon';
import LiquorIcon from '@mui/icons-material/Liquor';
import DisplayIngredients from './DisplayIngredients';

const DrinkDisplay = ({ drink }) => {
  if (drink) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="span">
            {drink.displayName}
          </Typography>
          <Typography variant="body2" component="span" sx={{ marginLeft: 5}}>
            {drink.category} - {drink.alcoholic}
          </Typography>
          <div id="pic-ingreds">
            <div id="drink-img">
            <CardMedia
              component="img"
              image={drink.image}
            />
            </div>
            <div>
            <DisplayIngredients drink={drink}/>
            </div>
          </div>
          <div>
            <Typography>
             {drink.instructions}
            </Typography>
          </div>
        </CardContent>
      </Card>
    )
  }
}

export default DrinkDisplay;

