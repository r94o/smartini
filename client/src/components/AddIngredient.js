import { useEffect, useState } from "react";

const AddIngredient = ({ addIngredient }) => {
  const [ingredientInput, setIngredientInput] = useState("")
  const [matchingIngredients, setMatchingIngredients] = useState([])
  const [allIngredients, setAllIngredients] = useState([])

  useEffect(() => {
    fetch("https://862840e1-6fa8-4a2d-a874-15705d2f04cb.mock.pstmn.io/get")
      .then(response => response.json())
      .then(( ingredients ) => setAllIngredients(ingredients));
  }, []);
  

  const handleChange = (event) => {
    setIngredientInput(event.target.value)
    if (event.target.value.length < 2) {
      setMatchingIngredients([])
    } else {
    const filter = allIngredients.filter(ingredient => {
      return ingredient.name.includes(event.target.value)
    })
    setMatchingIngredients(filter)
  }}

  const handleClick = (event) => {
    if (!ingredientInput) return;
    addIngredient(event.target.innerHTML);
    setIngredientInput("");
    setMatchingIngredients([]);
  }

  const handleKeyDown = (event) => {
    const enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) handleClick();
  }

  return (
    <>
    <div className="add-ingredient-container">
      <input type="text" id="ingredient-input" onChange={handleChange} onKeyDown={handleKeyDown} value={ingredientInput} placeholder="Enter Ingredient" />
      <button onClick={handleClick} id="add-ingredient">Add</button>
    </div>
    <div id="dropdown">
      <ul>
        {matchingIngredients.map((ingredient, i) => (<li key={i} onClick={handleClick}>{ingredient.name}</li>))}
      </ul>
    </div>
    </>
  )
}

export default AddIngredient