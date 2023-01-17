import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AllPosts from "./pages/AllPosts";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Navbar/Layout";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import PostDetail from "./pages/PostDetail";
import AddEditPost from "./pages/NewPost";
import NotFound from "./pages/NotFound";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<AllPosts />} />
        {!authCtx.isLoggedIn && (
          <Route path="/login" element={<Login/>}>
          </Route>
        )}

        <Route exact path="/users/:userId"  element={authCtx.isLoggedIn ? <ProfilePage /> : <Navigate to='/auth'/>} />
        <Route path="posts/:id" element={<PostDetail />} />
        <Route path="posts/add-post" element={<AddEditPost />} />
        <Route path="posts/edit-post" element={<AddEditPost />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
