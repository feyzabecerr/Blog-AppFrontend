import React from 'react'
import { Card, CardMedia, CardContent, Typography,CardActions,Button } from '@mui/material'
import classes from './PostItem.module.css'
import { Link } from 'react-router-dom'

function PostDisplay(props) {
  return (
    <Card className={classes.card}>
    <CardMedia
      sx={{ height: 140 }}
      image={props.image}
      title="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {props.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
      </Typography>
    </CardContent>
    <CardActions>
      <Link to={`/posts/${props.id}`}>
      <Button size="small">Learn More</Button>
      </Link>
    </CardActions>
  </Card>
    )
}

export default PostDisplay