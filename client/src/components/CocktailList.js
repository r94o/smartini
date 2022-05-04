import { useEffect, useState } from 'react'

const CocktailList = (props) => {
  const [cocktails, setCocktails] = useState([]) 

  useEffect(() => {
      fetch("https://862840e1-6fa8-4a2d-a874-15705d2f04cb.mock.pstmn.io/post", {
        method: "POST",
        body: JSON.stringify({
          ingredients: props.ingredients
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(({drinks}) => setCocktails(drinks));
  }, [props.ingredients]);

  return (
    <div id="cocktail-list">
      <table>
       <tbody>
        {cocktails.map((cocktail, i) =>
          <tr key={i}>
            <td><img src={cocktail.strDrinkThumb} alt="cocktail" width="200" height="200"></img>{cocktail.strDrink}</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  )
}

export default CocktailList