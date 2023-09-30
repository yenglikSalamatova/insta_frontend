import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import postsReducer from "./slice/postsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});
