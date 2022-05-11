import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import DisplayIngredients from './DisplayIngredients';
import YoutubeAPI from './YoutubeAPI'

const DrinkDisplay = ({ drink, searchedIngredients }) => {
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
            <DisplayIngredients drink={drink} searchedIngredients={searchedIngredients}/>
            </div>
          </div>
          <div id="instructions">
            <Typography>
             {drink.instructions}
            </Typography>
          </div>
          <div id="glass-type">
            <Typography>
              Glass type: {drink.glass.displayName} 
            </Typography>
          </div>
          <div id="youtube-container">
           {/* <YoutubeAPI drink={drink}/> */}
          </div>
        </CardContent>
      </Card>
    )
  }
}

export default DrinkDisplay;

