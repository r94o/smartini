import './App.css';
import AddIngredient from './components/AddIngredient';
import { useState } from 'react'
import IngredientList from './components/IngredientList';
import CocktailList from './components/CocktailList';

function App() {
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = (ingredient) => {
    setIngredients([ingredient, ...ingredients])
  }

  const deleteIngredient = (deleteIndex) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== deleteIndex);
    setIngredients(updatedIngredients);
  }

  return (
    <div className="main-container">
      <AddIngredient addIngredient={addIngredient} />
      <IngredientList ingredients={ingredients} deleteIngredient={deleteIngredient}/>
      <CocktailList ingredients={ingredients} />
    </div>
  );
}

export default App;
