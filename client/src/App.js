import { useState, useEffect } from 'react'
import IngredientSearch from './components/IngredientSearch';
import Header from './components/Header';
import MatchingDrinks from './components/MatchingDrinks';
import DisplayDrink from './components/DisplayDrink';

function App() {

  const [ingredients, setIngredients] = useState([])
  const [drink, setDrink] = useState(null)

  useEffect(() => {
    setDrink(null);
  },[ingredients])

  return (
    <div>
      <Header />
      <div id="main-container">
        <div id="left-side-inner-container">
          <div id="ingredient-search">
            <IngredientSearch setIngredients={setIngredients} />
          </div>
          <div id="matching-drinks-container">
            <MatchingDrinks ingredients={ingredients} setDrink={setDrink}/>
          </div>
        </div>
        <div id="right-side-inner-container">
          <DisplayDrink drink={drink} />
        </div>
      </div>
    </div>
  );
}


export default App;
