import React from "react";
import PostList from "./PostList";
import AddPost from "./AddPost";
import SearchBar from "./SearchBar";
import SortBy from "./SortBy";

const Main = ({
  posts,
  handleDelete,
  showAddPost,
  handleAdd,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
}) => {
  return (
    <main>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SortBy sortBy={sortBy} setSortBy={setSortBy} />
      <PostList posts={posts} handleDelete={handleDelete} />
      {showAddPost && <AddPost handleAdd={handleAdd} />}
    </main>
  );
};

export default Main;