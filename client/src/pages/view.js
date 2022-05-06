import { useLocation } from "react-router-dom";

const View = () => {
  const { state : { drink }} = useLocation()
  console.log(drink)
  return (
      <div id="drinks-container">
        <h1>{drink.displayName}</h1>
        <img src={drink.image} alt="cocktail"/>
        <ul>
          {drink.ingredients.map((ingredient, i) => { 
            let measure = ""
            if (i < drink.measures.length){
              measure = drink.measures[i]
            }  
            return (<li key={i}>{ingredient}  {measure}</li>)
          })}
        </ul>
        <p>Instructions: {drink.instructions}</p>
        <h3>Glass: {drink.glass}</h3>
        <h3>{drink.alcoholic}</h3>
      </div>
  )
};

export default View;