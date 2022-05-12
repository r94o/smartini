import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react'



const MatchingDrinksFilter = ({ setApiURL, filterValue, setFilterValue }) => {

  const handleChange = (event, newValue) => {
    const apiURLs = ["http://localhost:3001/drinks", "http://localhost:3001/drinks/missing/1", "http://localhost:3001/drinks/ingredients"]
    setFilterValue(newValue);
    setApiURL(apiURLs[newValue])
  };
  
  return (
  <Box>
  <Tabs value={filterValue} onChange={handleChange} centered>
    <Tab sx={{ fontSize: 12}} label="Match" />
    <Tab sx={{ fontSize: 12}} label="One Ingredient Away" />
    <Tab sx={{ fontSize: 12}} label="Drink Contains" />
  </Tabs>
</Box>
  )
}

export default MatchingDrinksFilter;