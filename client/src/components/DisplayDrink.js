import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import DisplayIngredients from './DisplayIngredients';
import YoutubeAPI from './YoutubeAPI'

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
          <div>
           <YoutubeAPI drink={drink}/>
          </div>
        </CardContent>
      </Card>
    )
  }
}

export default DrinkDisplay;

