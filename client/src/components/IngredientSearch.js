import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';


const IngredientSearch = ({ setIngredients }) => {

  const [allIngredients, setAllIngredients] = useState([])

  const handleChange = (event, value) => {
    const ingredientTypes = value.map(value => value.type);
    const ingredientNames = value.map(value => value.name);
    setIngredients([...new Set(["Ice", "Salt", ...ingredientNames, ...ingredientTypes])]);
  }


  useEffect(() => {
    fetch("http://localhost:3001/ingredients")
      .then(response => response.json())
      .then(( {ingredients} ) => setAllIngredients(ingredients));
  }, []);


  return (
    <Stack sx={{ width: 400 }}>
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
