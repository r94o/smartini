import './App.css';
import AddIngredient from './components/AddIngredient';
import { useState } from 'react'
import IngredientList from './components/IngredientList';

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
    </div>
  );
}

export default App;
