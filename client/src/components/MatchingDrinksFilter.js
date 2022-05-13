import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react'

const MatchingDrinksFilter = ({ setApiURL, filterValue, setFilterValue }) => {
  const handleChange = (event, newValue) => {
    const apiURLs = ["./drinks", "./drinks/missing/1", "./drinks/ingredients"]
    setFilterValue(newValue);
    setApiURL(apiURLs[newValue])
  };

  return (
    <Box>
      <Tabs value={filterValue} onChange={handleChange} centered>
        <Tab sx={{ fontSize: 12 }} label="Can Make" />
        <Tab sx={{ fontSize: 12 }} label="One Away" />
        <Tab sx={{ fontSize: 12 }} label="Contains" />
      </Tabs>
    </Box>
  )
}

export default MatchingDrinksFilter;