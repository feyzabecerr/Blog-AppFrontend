import React from 'react'
import { useParams, Link } from 'react-router-dom'
import classes from './HighlightedPost.module.css'

function PostDetail(props) {
    const{id} = useParams();

  return (
    <figure className={classes.post}>

      <p>{props.title}</p>
          
      <figcaption>{props.description}</figcaption>

        <br/>
        <br/>
        <Link to = {`/posts/${Number(id) + -1}`}>Önceki Post</Link>
        <Link to = {`/posts/${Number(id) + 1}`}>  Sonraki Post</Link>
    </figure>
  )
}

export default PostDetail