import React, { useState, useEffect } from "react";
import PostList from "../components/Post/PostList";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { getAllPosts } from "../lib.js/api";

function AllPosts() {
  
  const {sendRequest, status, data: loadedPosts, error} = useHttp(getAllPosts, true);


  useEffect(() => {
    
    sendRequest();

  }, [sendRequest]);

  if(status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner/>
      </div>
    );
  }

  if(error) {
    return <p className="centered focused">{error}</p>
  }

  if(status === 'completed' && (!loadedPosts || loadedPosts.length === 0)) {
    return <p className="centered focused">No quotes found</p>
  }

    return (
      <PostList posts = {loadedPosts} />
    )

}

export default AllPosts;
