
const IngredientList = (props) => {

  const handleClick = (event) => {
    const elementIndex = parseInt(event.target.dataset.index)
    props.deleteIngredient(elementIndex);
  }

  return (
    <div id="ingredient-list">
      <table>
       <tbody>
        {props.ingredients.map((ingredient, i) =>
          <tr key={i}>
            <td>{ingredient}</td>
            <td><button data-index={i} onClick={handleClick}>Delete</button></td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  )
}

export default IngredientList