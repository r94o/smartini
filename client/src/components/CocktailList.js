import { useEffect, useState } from 'react'

const CocktailList = ({ ingredients }) => {
  const [cocktails, setCocktails] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/drinks", {
      method: "POST",
      body: JSON.stringify({
        ingredients
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(({ drinks }) => setCocktails(drinks));
  }, [ingredients]);

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