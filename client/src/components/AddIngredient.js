import { useState } from "react";

const AddIngredient = ({ addIngredient }) => {
  const [ingredientInput, setIngredientInput] = useState("")

  const handleChange = (event) => {
    setIngredientInput(event.target.value)
  }

  const handleClick = () => {
    if (!ingredientInput) return;
    addIngredient(ingredientInput);
    setIngredientInput("");
  }

  const handleKeyDown = (event) => {
    const enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) handleClick();
  }

  return (
    <div className="add-ingredient-container">
      <input type="text" id="ingredient-input" onChange={handleChange} onKeyDown={handleKeyDown} value={ingredientInput} placeholder="Enter Ingredient" />
      <button onClick={handleClick} id="add-ingredient">Add</button>
    </div>
  )
}

export default AddIngredient