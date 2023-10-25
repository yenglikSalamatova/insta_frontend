import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/utils/endPoint";
import { useDispatch } from "react-redux";

const storiesSlice = createSlice({
  name: "stories",
  initialState: {
    followedStories: [],
    storiesById: [],
  },
  reducers: {
    setFollowedStories: (state, action) => {
      state.followedStories = action.payload;
    },
    setStoriesById: (state, action) => {
      state.storiesById = action.payload;
    },
    clearStories: (state) => {
      state.followedStories = [];
      state.storiesById = [];
    },
  },
});

export const { setFollowedStories, setStoriesById, clearStories } =
  storiesSlice.actions;

export const getFollowedStories = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${END_POINT}/api/stories/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 200) {
      dispatch(setFollowedStories(res.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getStoriesById = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${END_POINT}/api/stories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 200) {
      dispatch(setStoriesById(res.data.stories));
    }
  } catch (error) {
    console.log(error);
  }
};

export const createStory = (data, onToggle) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${END_POINT}/api/stories`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    dispatch(getFollowedStories());
    onToggle();
  } catch (error) {
    console.log(error);
  }
};

export const deleteStory = (story) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${END_POINT}/api/stories/${story.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(getFollowedStories());
    dispatch(getStoriesById(story.userId));
  } catch (error) {
    console.log(error);
  }
};

export default storiesSlice.reducer;
