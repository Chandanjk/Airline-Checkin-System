import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "../../css/navbar.css";

import PropTypes from "prop-types";

const Header = (props) => {
  let isAdmin = false;
  if (props.user.role === "admin") {
    isAdmin = true;
  }
  return (
    <>
      <div className="container-fluid" style={{ maxWidth: "1200px" }}>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <span className="navbar-brand" style={{ paddingLeft: "5px" }}>
            AirLine
          </span>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {!window.location.href.includes("home") && !isAdmin ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    exact
                    activeClassName="active"
                    to={"/home/"}
                    className="nav-link"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    activeClassName="active"
                    to={"/checkin/" + props.flight_id}
                    className="nav-link"
                  >
                    Check In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    activeClassName="active"
                    to={"/inflight/" + props.flight_id}
                    className="nav-link"
                  >
                    In Flight
                  </NavLink>
                </li>
              </ul>
            ) : (
              <></>
            )}
            <ul
              className="navbar-nav d-flex flex-row ms-auto me-3"
              id="navbarNavDropdown"
            >
              <li className="nav-item me-3 me-lg-0 dropdown1">
                <a
                  className="nav-link dropdown-toggle dropbtn"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                    className="rounded-circle"
                    height="22"
                    alt=""
                    loading="lazy"
                  />
                </a>

                <div
                  className="dropdown-content"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <span className="dropdown-item">
                    <b>
                      {props.user.userName + " ( " + props.user.role + " ) "}
                    </b>
                  </span>

                  <NavLink to={"/logout/"} className="dropdown-item">
                    {" "}
                    Log Out
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

Header.propTypes = {
  flight_id: PropTypes.number,
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Header);
