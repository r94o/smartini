import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react'

const MatchingDrinks = ({ ingredients, setDrink, filterValue, apiURL }) => {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    if (ingredients.length) {
      fetch(apiURL, {
        method: "POST",
        body: JSON.stringify({
          ingredients
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(response => response.json())
        .then(({ drinks }) => {
          setDrinks(drinks)
        });
    } else {
      setDrinks([])
    }
  }, [ingredients, apiURL]);

  const handleClick = (drinkIndex) => {
    setDrink(drinks[drinkIndex])
  }

  return (
    <div>
      <Grid container spacing={0}>
        {drinks.map((drink, i) => (
          <Grid item xs={6}>
            <Card className="matching-drink" key={i} onClick={() => handleClick(i)}>
              <CardActionArea >
                <div className="img-wrapper">
                  <CardMedia
                    component="img"
                    image={drink.image}
                    className="hover-zoom"
                  />
                </div>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {drink.displayName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {drink.alcoholic} - {drink.category}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )

}

export default MatchingDrinks;
