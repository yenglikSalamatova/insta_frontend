import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import postsSlice from "./slice/postsSlice";
import subscriptionSlice from "./slice/subscriptionSlice";
import storiesSlice from "./slice/storiesSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice,
    subscription: subscriptionSlice,
    stories: storiesSlice,
  },
});
