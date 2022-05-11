import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react'

const MatchingDrinks = ({ ingredients, setDrink }) => {

  const [drinks, setDrinks] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/drinks", {
      method: "POST",
      body: JSON.stringify({
        ingredients
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(({ drinks }) => setDrinks(drinks));
  }, [ingredients]);

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





