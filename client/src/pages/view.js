import { useLocation } from "react-router-dom";
import Drink from "../components/Drink";
import SearchDrink from "../components/SearchDrink";
import './view.css';

const View = () => {
  const { state } = useLocation()

  if (state) {
    return (
      <Drink drink={state.drink} />
    )
  } else {
    return (
      <SearchDrink />
    )
  }
};

export default View;
