import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Bloglist.css";
import { useNavigate } from "react-router-dom";
const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [showAddPost, setShowAddPost] = useState(false);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (postId) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        setPosts(posts.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAdd = (title, body) => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", { title, body })
      .then((response) => {
        setPosts([...posts, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
    setShowAddPost(false);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date);
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  return (
    <div>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setShowAddPost={setShowAddPost}
      />
      <h1>Blog List</h1>
      <PostList posts={sortedPosts} handleDelete={handleDelete} />
      {showAddPost && <AddPost handleAdd={handleAdd} />}
    </div>
  );
};

const Navbar = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  setShowAddPost,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/pop");
  };

  return (
    <nav>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SortBy sortBy={sortBy} setSortBy={setSortBy} />
      <button onClick={handleButtonClick}>Add Post</button>
    </nav>
  );
};
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-bar">
      <label>Search:</label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        
      />
    </div>
  );
};

const SortBy = ({ sortBy, setSortBy }) => {
  return (
    <div className="sort-by">
      <label>Sort By:</label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="date">Date</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

const PostList = ({ posts, handleDelete }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post.id} post={post} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

const Post = ({ post, handleDelete }) => {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button onClick={() => handleDelete(post.id)}>Delete</button>
    </div>
  );
};

const AddPost = ({ handleAdd }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd(title, body);
    setTitle("");
    setBody("");
  };

  return (
    <div className="add-post">
      <h2>Add a Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Body:</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BlogList;