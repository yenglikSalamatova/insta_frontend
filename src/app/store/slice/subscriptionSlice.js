import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/utils/endPoint";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { getUserByUsername } from "./postsSlice";

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    followers: [],
    following: [],
    recomendations: [],
    profileFollowers: [],
    profileFollowing: [],
  },
  reducers: {
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
    setRecomendations: (state, action) => {
      state.recomendations = action.payload;
    },
    setProfileFollowers: (state, action) => {
      state.profileFollowers = action.payload;
    },
    setProfileFollowing: (state, action) => {
      state.profileFollowing = action.payload;
    },
    clearSubscriptions: (state) => {
      state.followers = [];
      state.following = [];
      state.recomendations = [];
      state.profileFollowers = [];
      state.profileFollowing = [];
    },
  },
});

export const {
  setFollowers,
  setFollowing,
  setRecomendations,
  setProfileFollowers,
  setProfileFollowing,
  clearSubscriptions,
} = subscriptionSlice.actions;

export const getFollowers = (username) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${END_POINT}/api/subscriptions/${username}/followers`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log(res);
    if (res.status === 200) {
      dispatch(setFollowers(res.data.followers));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProfileFollowers = (username) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${END_POINT}/api/subscriptions/${username}/followers`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log(res);
    if (res.status === 200) {
      dispatch(setProfileFollowers(res.data.followers));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFollowing = (username) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${END_POINT}/api/subscriptions/${username}/followings`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.status === 200) {
      dispatch(setFollowing(res.data.following));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProfileFollowing = (username) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${END_POINT}/api/subscriptions/${username}/followings`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.status === 200) {
      dispatch(setProfileFollowing(res.data.following));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRecommendations = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${END_POINT}/api/subscriptions/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 200) {
      dispatch(setRecomendations(res.data.users));
    }
  } catch (error) {
    console.log(error);
  }
};

export const followUser =
  (profileUser, currentUser, noChange = false) =>
  async (dispatch) => {
    // console.log(profileUser, currentUser);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${END_POINT}/api/subscriptions/${profileUser.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 201 && !noChange) {
        dispatch(getFollowers(currentUser.username));
        dispatch(getFollowing(currentUser.username));
        dispatch(getUserByUsername(profileUser.username));
      } else if (res.status === 201 && noChange) {
        dispatch(getFollowers(currentUser.username));
        dispatch(getFollowing(currentUser.username));
        dispatch(getProfileFollowers(currentUser.username));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const unfollowUser =
  (profileUser, currentUser, noChange = false) =>
  async (dispatch) => {
    // console.log(profileUser, currentUser);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `${END_POINT}/api/subscriptions/${profileUser.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 201 && !noChange) {
        dispatch(getFollowers(currentUser.username));
        dispatch(getFollowing(currentUser.username));
        dispatch(getUserByUsername(profileUser.username));
      } else if (res.status === 201 && noChange) {
        dispatch(getFollowers(currentUser.username));
        dispatch(getFollowing(currentUser.username));
        dispatch(getProfileFollowers(currentUser.username));
      }
    } catch (error) {
      console.log(error);
    }
  };

export default subscriptionSlice.reducer;
