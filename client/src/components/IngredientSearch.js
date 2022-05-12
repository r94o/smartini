import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';


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
      <FormControlLabel disableTypography sx={{fontSize: 12, margin: "0px auto 15px"}} control={<Switch size="small" />} label="Include partial matches" onChange={handleToggleChange} />
    </FormGroup>
    
    </Stack>
  )
}

export default IngredientSearch;
