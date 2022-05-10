import { Routes, Route, Outlet, Link } from "react-router-dom";
function App(){
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="view" element={<View />} />
    </Route>
  </Routes> 
}

export default App;

