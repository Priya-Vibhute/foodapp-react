import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../user/AuthContext";

function Navbar() {
  const { token, user, logOut } = useContext(authContext);

  const navigate = useNavigate();

  const logoutUser = () => {
    logOut();
    navigate(["/login"]);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">
          FoodApp
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to={"/"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/menu"}>
                Menu
              </Link>
            </li>

            {token ? (
              <>
                <p>{user.name}</p>
                <li className="nav-item">
                  <button className="nav-link" onClick={() => logoutUser()}>
                    Logout
                  </button>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to={"/cart"}>
                    Cart
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={"/register"}>
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
