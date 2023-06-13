import React, { useState } from "react";
import "./AddPost.css";
import { useNavigate } from "react-router-dom";
const AddPost = ({ handleAdd }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd(title, body);
    setTitle("");
    setBody("");
  };
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <div className="add-post-container">
      <div className="add-post-column">
        <div className="add-post-card add-post-left">
          <h2>Add a Post</h2>
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            /><br ></br>
            <label>Body:</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea><br ></br>
            <button onClick={handleButtonClick} type="submit">Add Post</button>

          </form>
        </div>
      </div>
      <div className="add-post-column">
        <div className="add-post-card add-post-right"></div>
      </div>
    </div>
  );
};

export default AddPost;
