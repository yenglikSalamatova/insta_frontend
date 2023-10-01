import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import postsReducer from "./slice/postsSlice";
import useAuth from "./slice/useAuth";

export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});
