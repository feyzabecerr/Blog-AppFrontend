import * as React from "react";
import classes from "../Post/Post.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { InputAdornment, OutlinedInput } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Post(props) {
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [isSent, setIsSent] = useState(false);
  const [title, setTitle] = useState("");
  const { userId, userName } = props;

  const savePost = () => {
    let post = {
      title: title,
      userId: userId,
      description: description,
    };
    const json = JSON.stringify(post);
    const blob = new Blob([json], {
      type: 'application/json'
    });

    const formData = new FormData();
    formData.append("image", image);
    formData.append("post", blob);
    fetch("/posts/api", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("myJwtTokenKey"),
      },
      body: formData,
    })
      .then((res) => res.json())
      .catch((err) => console.log("error"));
  };

  const handleSubmit = () => {
    if (!description && !title) {
      alert("Please fill all the fields.");
      setIsSent(false);
      return;
    }

    savePost();
    setIsSent(true);
    setTitle("");
    setDescription("");
    setImage(null);

 };

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  };

  const handleDescription = (value) => {
    setDescription(value);
    setIsSent(false);
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    console.log([...formData.entries()]);
    
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSent(false);
  };

  return (
    <div>
      <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Post added Successfully!
        </Alert>
      </Snackbar>

      <Card sx={{ maxWidth: 400 }} className={classes.card}>
        <CardMedia
          component="img"
          style={{ 'border' : '1px solid #000'}}
          image={
            imagePreview !== null
              ? imagePreview
              : "http://flxtable.com/wp-content/plugins/pl-platform/engine/ui/images/default-image.png"
          }
        />
        <input
          accept="image/*"
          className={classes.input}
          id="upload-profile-image"
          type="file"
          onChange={(i) => handleImage(i)}
        />
        <CardHeader
          className={classes.root}
          avatar={
            <Link
              className={classes.link}
              to={{ pathname: "/users/" + userId }}
            >
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }
          title={
            <OutlinedInput
              id="outlined-adornment-amount"
              multiline
              placeholder="Title"
              inputProps={{ maxLength: 100 }}
              fullWidth
              value={title}
              onChange={(i) => handleTitle(i.target.value)}
            ></OutlinedInput>
          }
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {
              <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                placeholder="Description"
                inputProps={{ maxLength: 10000 }}
                fullWidth
                value={description}
                onChange={(i) => handleDescription(i.target.value)}
                endAdornment={
                  <InputAdornment>
                    <Button onClick={handleSubmit} variant="contained">
                      Post
                    </Button>
                  </InputAdornment>
                }
              ></OutlinedInput>
            }
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Post;
