
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LiquorIcon from '@mui/icons-material/Liquor';

const DisplayIngredients = ({ drink }) => {
  console.log(drink)
  if (drink) {
    return (
      <List dense={true} disablePadding={true}>
        {drink.ingredients.map((ingredient, i) => (
      <ListItem>
        <ListItemIcon>
          <LiquorIcon />
        </ListItemIcon>
        <ListItemText primary={ingredient} secondary={drink.measures[i]}/>
      </ListItem>
        ))}
      </List>
    )
  }
}

export default DisplayIngredients;