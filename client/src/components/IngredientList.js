
const IngredientList = (props) => {
  return (
    <div id="ingredient-list">
      <table>
        {props.ingredients.map((ingredient, i) =>
          <tr key={i}>
            <td>{ingredient}</td>
            <td><button>Delete</button></td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default IngredientList