import { useEffect, useState } from "react";

const AddIngredient = ({ addIngredient }) => {
  const [ingredientInput, setIngredientInput] = useState("")
  const [matchingIngredients, setMatchingIngredients] = useState([])
  const [allIngredients, setAllIngredients] = useState([])
  const [selectionIndex, setSelectionIndex] = useState(0)

  useEffect(() => {
    fetch("http://localhost:3001/ingredients")
      .then(response => response.json())
      .then(( {ingredients} ) => setAllIngredients(ingredients));
  }, []);
  
  const handleChange = (event) => {

    const input = event.target.value.toLowerCase()
    setIngredientInput(input)

    if (input.length < 2) {
      setMatchingIngredients([]);
      return;
    }

    const filteredIngredients = allIngredients.filter(ingredient => {
      return ingredient.name.includes(input);
    })
    setMatchingIngredients(filteredIngredients);
    setSelectionIndex(0);
  }

  const handleEnter = (selectionIndex) => {
    if (!ingredientInput) return;
    const ingredientName = matchingIngredients[selectionIndex].displayName
    addIngredient(ingredientName);
    resetState();
  }

  const handleClick = (event) => {
    if (!ingredientInput) return;
    const ingredientName = event.target.innerHTML
    addIngredient(ingredientName);
    resetState()
  }

  const resetState = () => {
    setIngredientInput("");
    setMatchingIngredients([]);
    setSelectionIndex(0)
  }

  const handleKeyDown = (event) => {
    console.log(event)
    const [enterKeyCode, downKeyCode, upKeyCode] = [13, 40, 38];
    if (event.keyCode === enterKeyCode) handleEnter(selectionIndex);
    if (event.keyCode === downKeyCode) setSelectionIndex(selectionIndex + 1);
    if (event.keyCode === upKeyCode) setSelectionIndex(selectionIndex - 1);
    const selection = document.querySelector(".active");
    if (selection) selection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  
  return (
    <div className="add-ingredient-container">
      <input type="search" id="ingredient-input" onChange={handleChange} onKeyDown={handleKeyDown} value={ingredientInput} placeholder="Enter Ingredient" />
      <ul className="matching-ingredients-list">
        {matchingIngredients.map((ingredient, i) => {
          let activeClassName
          if (i === selectionIndex) {
            activeClassName = "active"
          }
          return (<li key={i} onClick={handleClick} className={activeClassName}>{ingredient.displayName}</li>)
        })}
      </ul>
    </div>
  )
}

export default AddIngredient