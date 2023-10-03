import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/utils/endPoint";
import authSlice from "./authSlice";
import { execOnce } from "next/dist/shared/lib/utils";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    profilePosts: [],
    posts: [],
    post: {},
  },
  reducers: {
    setProfilePosts(state, action) {
      state.profilePosts = action.payload;
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setPost(state, action) {
      state.post = action.payload;
    },
  },
});

export const { setProfilePosts, setPosts, setPost } = postsSlice.actions;

export const getFollowedPosts = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${END_POINT}/api/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status == 201) {
      console.log(res);
      dispatch(setPosts(res.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPostsByUsername = (username) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${END_POINT}/api/posts/byUsername/${username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.status === 200) {
      dispatch(setProfilePosts(res.data.posts));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/posts/${id}`);
    if (res.status === 201) {
      dispatch(setPost(...res.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, router) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${END_POINT}/api/posts`, post, {
      headers: { Authorization: `Bearer ${token}` },
    });
    router.push("/posts");
  } catch (error) {
    console.log(error);
  }
};

export default postsSlice.reducer;
