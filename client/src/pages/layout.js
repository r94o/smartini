import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
      <Link className="navbar-brand" to="/"><img src="/martini.png" alt="" width="50" className="d-inline-block align-text-top" /></Link>
        <Link className="navbar-brand" to="/">Smartini</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/view">Drinks</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <Outlet />
    </>
  )
};

export default Layout;