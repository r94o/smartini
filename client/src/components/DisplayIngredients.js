
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LiquorIcon from '@mui/icons-material/Liquor';

const DisplayIngredients = ({ drink }) => {
  if (drink) {
    return (
      <div style={{textTransform: 'capitalize'}}>
      <List dense={true} disablePadding={true}>
        {drink.ingredientStrings.map((ingredient, i) => (
      <ListItem>
        <ListItemIcon>
          <LiquorIcon />
        </ListItemIcon>
        <ListItemText primary={ingredient} secondary={drink.measures[i]}/>
      </ListItem>
        ))}
      </List>
      </div>
    )
  }
}

export default DisplayIngredients;