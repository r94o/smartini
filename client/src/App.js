import logo from './logo.svg';
import './App.css';
import AddIngredient from './components/AddIngredient';
import { useState } from 'react'
import IngredientList from './components/IngredientList';

function App() {
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = (ingredient) => {
    setIngredients([ingredient, ...ingredients])
  }

  return (
    <div className="main-container">
      <AddIngredient addIngredient={addIngredient} />
      <IngredientList ingredients={ingredients} />
    
    

    </div>
  );
}

export default App;
