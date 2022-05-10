import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";



const IngredientSearch = ({ setIngredients }) => {

  const [allIngredients, setAllIngredients] = useState([])

  const handleChange = (event, value) => {
    const ingredientNames = value.map(value => value.name)
    setIngredients(["Ice", "Salt", ...ingredientNames]);
  }

  useEffect(() => {
    fetch("http://localhost:3001/ingredients")
      .then(response => response.json())
      .then(( {ingredients} ) => setAllIngredients(ingredients));
  }, []);

  return (
    <Stack sx={{ width: 350 }}>
    <Autocomplete
        multiple
        id="tags-outlined"
        options={allIngredients}
        getOptionLabel={(option) => option.displayName}
        filterSelectedOptions
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter Ingredients"
          />
        )}
      />
    </Stack>
  )
}

export default IngredientSearch;
