import { useLocation } from "react-router-dom";
import './view.css';

const View = () => {
  const { state : { drink }} = useLocation()
  return (



      <div id="drinks-container">
        <div class="card mb-3" style={{"max-width": "540px"}}>
          <div class="row g-0">
        <div class="col-md-4">
        <img src={drink.image} class="img-fluid rounded-start" alt="..." />
        <img src={drink.image} class="img-fluid rounded-start" alt="..." />
        <img src={drink.image} class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{drink.displayName}</h5>
            <p class="card-text">This is a wider card with  a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit lo a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit lo a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit losupporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
      </div>
        </div>
        
        <img src={drink.image} alt="cocktail" width="200"/>
        <h1>{drink.displayName}</h1>
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