import "./App.css";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Footer from "./components/footer";
import Signup from "./pages/signup";
import Login from "./pages/login";
import SearchResult from "./pages/searchResult";
import ViewPost from "./pages/viewPost";
import Profile from "./pages/profile";
import CreatePost from "./pages/createPost";
import Bookmarks from "./pages/bookmarks";
import ChangePassword from "./pages/changePassword";
import EditProfile from "./pages/editProfile";
import Author from "./pages/author";
import Topic from "./pages/topic";

import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/mainLayout";
import UserLayout from "./layouts/userLayout";

import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./pages/protectedRoute";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="post/:postId" element={<ViewPost />} />
          <Route path="topic/:topicId" element={<Topic />} />
          <Route path="author/:username" element={<Author />} />
          <Route path="search" element={<SearchResult />} />
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="bookmarks"
            element={
              <ProtectedRoute>
                <Bookmarks />
              </ProtectedRoute>
            }
          />
          <Route
            path="change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />

      <Toaster />
    </>
  );
}

export default App;
