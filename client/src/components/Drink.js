import YoutubeAPI from "../components/YoutubeAPI"


const Drink = ({ drink }) => {

  return (
      <div id="drinks-container" style={{marginTop: "20px"}}>
            <div className="card mb-3" style={{maxWidth: "75%"}}>
              <div className="row g-0">
            <div className="col-md-4 mt-2">
              <img src={drink.image} className="img-fluid rounded-start img-thumbnail" alt="..." />
              <p className="card-text">Highball Glass</p>
              <p className="card-text">IBA Cocktail</p>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{drink.displayName}</h5>
                <ul>
                  {drink.ingredients.map((ingredient, i) => { 
                    let measure = ""
                    if (i < drink.measures.length){
                      measure = drink.measures[i]
                    }  
                    return (<li key={i}>{ingredient}  {measure}</li>)
                  })}
              </ul>
              <p className="card-text">{drink.instructions}</p>
              <YoutubeAPI drink={drink.displayName}/>
              </div>
            </div>
            </div>
          </div>
        
        </div>
  )
  
}

export default Drink;