

const CocktailRecommendationList = (props) => {

  return (
    <div id="cocktail-recommendation-list">
    <table>
     <tbody>
      {props.recommendedCocktails.map((cocktail, i) =>
        <tr key={i}>
          <td><a href={`${cocktail.href}`}>{cocktail.name}</a></td>
        </tr>
      )}
      </tbody>
    </table>
  </div>
  )
}

export default CocktailRecommendationList