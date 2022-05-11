import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.scss";
function Header() {
  return (
    <header className="header">
      <div className="logo">Cards</div>
      <div className="menu">
        <div className="menu-btn">
          <Link to={"/start"}>New Game</Link>
        </div>
        <div className="menu-btn">
          <Link to={"/start"} onClick={() => window.location.reload()}>
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
