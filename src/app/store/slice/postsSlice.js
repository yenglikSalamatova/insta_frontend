import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/utils/endPoint";
import authSlice from "./authSlice";
import { execOnce } from "next/dist/shared/lib/utils";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
  },
});

export const { setPosts } = postsSlice.actions;

export const getFollowedPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/posts`);
    if (res.status === 200) {
    }
  } catch (error) {
    console.log(error);
  }
};

export default postsSlice.reducer;
