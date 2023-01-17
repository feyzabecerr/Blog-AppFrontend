import React, { useContext } from "react";
import PostForm from '../components/Post/PostForm'
import AuthContext from "../store/auth-context";

function AddPost() {
  const authCtx = useContext(AuthContext);
  return (
    <div>
      {!authCtx.isLoggedIn ? (
        <h2 className="centered">You must login first to create a new Post.</h2>
      ) : (
        <div>
          {" "}
          <h2>Add new Post</h2>
          <PostForm
            userId={localStorage.getItem("currentUser")}
            userName={localStorage.getItem("userName")}
          />
        </div>
      )}
    </div>
  );
}

export default AddPost;
