import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.scss";
function Header() {
  return (
    <header className="header">
      <div className="logo" onClick={() => window.location.replace("/")}>
        Cards
      </div>
      <div className="menu">
        <div className="menu-btn">
          <Link to={"/start"}>New Game</Link>
        </div>
        <div className="menu-btn">
          <Link to={"/start"} onClick={() => window.location.replace("/start")}>
            Reset
          </Link>
        </div>
        <div className="menu-btn">
          <Link to={"/history"}>History</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
