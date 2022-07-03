import React from "react";
import "./header.css";

const Header = ({title}) => {
  return (
    <header className="Header">
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
