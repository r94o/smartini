import { useState } from 'react'
import IngredientSearch from './components/IngredientSearch';
import Header from './components/Header';
import MatchingDrinks from './components/MatchingDrinks';
import DisplayDrink from './components/DisplayDrink';
import DrinkSearch from './components/DrinkSearch';
import MatchingDrinksFilter from './components/MatchingDrinksFilter';

import { ThemeProvider } from '@mui/material/styles';
import Theme from './components/Theme.js'

function App() {

  const [ingredients, setIngredients] = useState([])
  const [drink, setDrink] = useState(null)
  const [matchingDrinksToggle, setMatchingDrinksToggle] = useState(false)
  const [apiURL, setApiURL] = useState("http://localhost:3001/drinks")
  const [filterValue, setFilterValue] = useState(0);

  return (
    <ThemeProvider theme={Theme}>
      <div>
        <Header />
        <div id="main-container">
          <div id="left-side-inner-container">
            <div id="ingredient-search">
              <IngredientSearch setIngredients={setIngredients} ingredients={ingredients} />
            </div>
            <div id="matching-drinks-filter">
              <MatchingDrinksFilter setApiURL={setApiURL} filterValue={filterValue} setFilterValue={setFilterValue} />
            </div>
            <div id="matching-drinks-container">
              <MatchingDrinks ingredients={ingredients} setDrink={setDrink} matchingDrinksToggle={matchingDrinksToggle} apiURL={apiURL} />
            </div>
          </div>
          <div id="right-side-inner-container">
            <div id="drink-search">
              <DrinkSearch setDrink={setDrink} matchingDrinksToggle={matchingDrinksToggle} />
            </div>
            <div id="display-drink-container">
              <DisplayDrink drink={drink} searchedIngredients={ingredients} />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider >
  );
}


export default App;
