import { useState } from "react";

const AddIngredient = (props) => {
  const [ingredientInput, setIngredientInput] = useState("")

  const handleChange = (event) => {
    setIngredientInput(event.target.value)
  }

  const handleClick = () => {
    props.addIngredient(ingredientInput);
    setIngredientInput("");
  }

  return (
    <div className="add-ingredient-container">
      <input type="text" id="ingredient-input" onChange={handleChange} value={ingredientInput} placeholder="Enter Ingredient" />
      <button onClick={handleClick} id="add-ingredient">Add</button>
    </div>
  )
}

export default AddIngredient