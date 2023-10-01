import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/utils/endPoint";
import authSlice from "./authSlice";
import { execOnce } from "next/dist/shared/lib/utils";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    myPosts: [],
  },
  reducers: {
    setMyPosts(state, action) {
      state.myPosts = action.payload;
    },
  },
});

export const { setMyPosts } = postsSlice.actions;

export const getFollowedPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/posts`);
    if (res.status === 200) {
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPostsByUsername = (username) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${END_POINT}/api/posts/byUsername/${username}`
    );
    if (res.status === 200) {
      dispatch(setMyPosts(res.data.posts));
    }
  } catch (error) {
    console.log(error);
  }
};

export default postsSlice.reducer;
