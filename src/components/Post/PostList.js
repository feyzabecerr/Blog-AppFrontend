import * as React from "react";
import { Fragment } from "react";
import classes from "./PostList.module.css";
import PostItem from "./PostItem";
import { Grid, Box } from "@mui/material";

function PostList(props) {
  const postList = props.posts;

  return (
    <Fragment>
      <ul className={classes.list}>
        <Box p={5}>
        <Grid container spacing={5} style={{display:'grid'}}>
   
          {postList.map((post,index) => (
            <Grid item key={index}>
              <PostItem
                id={post.id}
                date={post.date}
                title={post.title}
                description={post.description}
                image={post.image}
              />
            </Grid>
          ))}
          </Grid>
          </Box>
      </ul>
    </Fragment>
  );
}

export default PostList;
