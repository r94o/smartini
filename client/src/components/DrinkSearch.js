import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';

const DrinkSearch = ({ setDrink }) => {

  const [allDrinks, setAllDrinks] = useState([])

  const handleChange = (event, value) => {
    setDrink(value)
  }

  const handleClick = () => {
    const randomDrink = allDrinks[Math.floor(Math.random() * allDrinks.length)];
    setDrink(randomDrink);
  }

  useEffect(() => {
    fetch("/drinks/")
      .then(response => response.json())
      .then(({ drinks }) => setAllDrinks(drinks));
  }, []);

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={allDrinks}
        getOptionLabel={(option) => option.displayName}
        onChange={handleChange}
        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', width: "300px" }}
        renderInput={(params) => <TextField {...params} label="Search Drinks" />}
      />
      <Button
        variant="outlined"
        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
        onClick={handleClick}>
        Random Drink
      </Button>
    </>
  )
}

export default DrinkSearch;
