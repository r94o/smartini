
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LiquorIcon from '@mui/icons-material/Liquor';
import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';

const DisplayIngredients = ({ drink, searchedIngredients }) => {
  if (drink) {
    console.log(drink)
    return (
      <div style={{ textTransform: 'capitalize' }}>
        <List dense={true} disablePadding={true}>
          {drink.ingredientStrings.map((ingredient, i) => {
            let icon = <LiquorOutlinedIcon sx={{ color: "#ababab" }} />
            let colour = "#ababab"
            let fontWeight = ""
            if (searchedIngredients.includes(ingredient)) {
              icon = <LiquorIcon sx={{ color: "black" }} />
              colour = "black"
              fontWeight = "bold"
            }
            return (
              <ListItem key={i}>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ color: colour, fontWeight: fontWeight }} primary={ingredient} secondary={drink.measures[i]} />
              </ListItem>
            )
          }
          )}
        </List>
      </div>
    )
  }
}

export default DisplayIngredients;