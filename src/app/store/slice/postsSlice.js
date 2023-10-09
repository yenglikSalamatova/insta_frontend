import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/utils/endPoint";
import authSlice from "./authSlice";
import { execOnce } from "next/dist/shared/lib/utils";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    profile: {},
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
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => {
        return post.id != action.payload;
      });
    },
    addPost(state, action) {
      state.posts.push(action.payload);
    },
    setProfile(state, action) {
      state.profile = action.payload;
    },
  },
});

export const { setProfilePosts, setPosts, setPost, setProfile } =
  postsSlice.actions;

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
  } catch (error) {
    console.log(error);
  }
};

export const deletePost =
  (id, username = "") =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${END_POINT}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      dispatch(deletePost(id));
      dispatch(getFollowedPosts());
      if (username) {
        dispatch(getPostsByUsername(username));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const editPost = (id, post) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.patch(`${END_POINT}/api/posts/${id}`, post, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createComment = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${END_POINT}/api/comments`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(getFollowedPosts());
    dispatch(getPost(data.postId));
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (id, postId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${END_POINT}/api/comments/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(getPost(postId));
  } catch (error) {
    console.log(error);
  }
};

export const getUserByUsername = (username) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${END_POINT}/api/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 200) {
      dispatch(setProfile(res.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getInterestingPosts = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${END_POINT}/api/posts/interesting`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 200) {
      dispatch(setPosts(res.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export default postsSlice.reducer;
