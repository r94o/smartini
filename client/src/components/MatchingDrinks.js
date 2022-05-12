import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react'


const MatchingDrinks = ({ ingredients, setDrink, matchingDrinksToggle }) => {

  const [drinks, setDrinks] = useState([])


  useEffect(() => {
    if (ingredients.length) {
      let apiURL = "http://localhost:3001/drinks"
      if (matchingDrinksToggle) {
        apiURL = "http://localhost:3001/drinks/ingredients"
      } else {
        setDrinks([])
      }

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
          console.log("getting response");
          setDrinks(drinks)
        });
    } else {
      console.log("this is emptying the setDrinks array")
      setDrinks([])
    }
  }, [ingredients, matchingDrinksToggle]);

  const handleClick = (drinkIndex) => {
    setDrink(drinks[drinkIndex])
  }

  return (
    <div>
      {drinks.map((drink, i) => (
        <Card sx={{ maxWidth: 150 }} className="matching-drink" key={i} onClick={() => handleClick(i)}>
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
      ))}
    </div>
  )

}

export default MatchingDrinks;
