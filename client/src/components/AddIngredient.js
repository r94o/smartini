import { useState } from "react";

const AddIngredient = (props) => {
  const [ingredientInput, setIngredientInput] = useState("")

  const handleChange = (event) => {
    setIngredientInput(event.target.value)
  }

  const handleClick = () => {
    if (!ingredientInput) return;
    props.addIngredient(ingredientInput);
    setIngredientInput("");
  }

  const handleKeyPress = (event) => {
    if (event.charCode === 13) handleClick();
  }

  return (
    <div className="add-ingredient-container">
      <input type="text" id="ingredient-input" onChange={handleChange} onKeyPress={handleKeyPress} value={ingredientInput} placeholder="Enter Ingredient" />
      <button onClick={handleClick} id="add-ingredient">Add</button>
    </div>
  )
}

export default AddIngredient