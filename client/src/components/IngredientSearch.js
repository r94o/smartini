import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const IngredientSearch = ({ setIngredients, setMatchingDrinksToggle }) => {

  const [allIngredients, setAllIngredients] = useState([])

  const handleChange = (event, value) => {
    const ingredientNames = value.map(value => value.name)
    setIngredients(ingredientNames);
  }

  const handleToggleChange = () => {
    setMatchingDrinksToggle((previousState) => !previousState)
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
    <FormGroup>
      <FormControlLabel control={<Switch />} label="Show all cocktails including the above" onChange={handleToggleChange} />
    </FormGroup>
    </Stack>
  )
}

export default IngredientSearch;
