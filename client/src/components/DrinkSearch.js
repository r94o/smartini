import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";



const DrinkSearch = ({ setDrink }) => {

  const [allDrinks, setAllDrinks] = useState([])

  const handleChange = (event, value) => {
    setDrink(value)
  }

  useEffect(() => {
    fetch("http://localhost:3001/drinks/")
      .then(response => response.json())
      .then(( {drinks} ) => setAllDrinks(drinks));
      }, []);

  return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={allDrinks}
        getOptionLabel={(option) => option.displayName}
        onChange={handleChange}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search Drinks..." />}
      />
  )
}


export default DrinkSearch;
