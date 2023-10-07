import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authSlice from "./slice/authSlice";
import postsSlice from "./slice/postsSlice";
import subscriptionSlice from "./slice/subscriptionSlice";
import storiesSlice from "./slice/storiesSlice";
import likesSlice from "./slice/likesSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice,
    subscription: subscriptionSlice,
    stories: storiesSlice,
    likes: likesSlice,
  },
  middleware: [thunk],
});
