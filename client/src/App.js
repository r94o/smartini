import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import View from "./pages/view";
import Layout from "./pages/layout";

function App(){
  return(
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="view" element={<View />} />
      </Route>
    </Routes> 
  )
}

export default App;

