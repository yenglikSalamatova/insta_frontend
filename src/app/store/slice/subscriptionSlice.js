import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/utils/endPoint";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    followers: [],
    following: [],
    recomendations: [],
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
  },
});

export const { setFollowers, setFollowing, setRecomendations } =
  subscriptionSlice.actions;

export const getFollowers = (username) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${END_POINT}/api/subscriptions/${username}/followers`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(res);
    if (res.status === 200) {
      dispatch(setFollowers(res.data.followers));
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

export default subscriptionSlice.reducer;
