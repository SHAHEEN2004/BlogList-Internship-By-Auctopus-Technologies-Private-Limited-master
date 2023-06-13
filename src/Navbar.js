// Navbar.js

import React from "react";
import AddPost from "./AddPost";

const Navbar = ({ searchTerm, setSearchTerm, sortBy, setSortBy, handleAdd }) => {
  return (
    <nav>
      <AddPost handleAdd={handleAdd} />
    </nav>
  );
};

export default Navbar;
