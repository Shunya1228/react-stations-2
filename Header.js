import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <h1>掲示板</h1>
      <nav>
      <Link to="/">Home</Link> |<Link to="/threads/new">スレッドを立てる</Link>
      </nav>
    </header>
  );
};
export default Header