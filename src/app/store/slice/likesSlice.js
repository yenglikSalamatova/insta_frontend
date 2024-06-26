import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/utils/endPoint";
import { useDispatch } from "react-redux";
import { getFollowedPosts } from "@/app/store/slice/postsSlice";

const likesSlice = createSlice({
  name: "likes",

  initialState: {
    likes: [],
    bookmarks: [],
  },
  reducers: {
    setLikes: (state, action) => {
      state.likes = [...state.likes, action.payload];
      console.log("likes", state.likes);
    },
    filterLikes: (state, action) => {
      state.likes = state.likes.filter(
        (like) => like.entityId !== action.payload
      );
    },
    setBookmarks: (state, action) => {
      state.bookmarks = [...state.bookmarks, action.payload];
      console.log("bookmarks", state.bookmarks);
    },
    clearLikesBookmarks: (state) => {
      state.likes = [];
      state.bookmarks = [];
    },
    filterBookmarks: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.postId !== action.payload.postId
      );
    },
  },
});

export const {
  setLikes,
  setBookmarks,
  clearLikesBookmarks,
  filterLikes,
  filterBookmarks,
} = likesSlice.actions;

export const getLikes = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${END_POINT}/api/likes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(res);
    if (res.status === 200) dispatch(setLikes(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const likeEntity = (data) => async (dispatch) => {
  try {
    // const token = localStorage.getItem("token");
    // const res = await axios.post(`${END_POINT}/api/likes/`, data, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });

    dispatch(setLikes(data));
    console.log();
  } catch (error) {
    console.log(error);
  }
};

export const unlikeEntity = (data) => async (dispatch) => {
  try {
    // const token = localStorage.getItem("token");
    // const res = await axios.delete(`${END_POINT}/api/likes/`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    //   data: JSON.stringify(data), // Преобразование объекта `data` в строку JSON
    // });

    dispatch(filterLikes(data.entityId));
  } catch (error) {
    console.log(error);
  }
};

export const getBookmarks = () => async (dispatch) => {
  try {
    // const token = localStorage.getItem("token");
    // const res = await axios.get(`${END_POINT}/api/posts/saved/`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    // });
    // if (res.status === 200) {
    //   dispatch(setBookmarks(res.data));
    // }
  } catch (error) {
    console.log(error);
  }
};

export const createBookmark = (postId) => async (dispatch) => {
  try {
    // const token = localStorage.getItem("token");
    // const res = await axios.post(
    //   `${END_POINT}/api/posts/saved/${postId}`,
    //   {},
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    dispatch(setBookmarks({ postId }));
  } catch (error) {
    console.log(error);
  }
};

export const deleteBookmark = (postId) => async (dispatch) => {
  try {
    // const token = localStorage.getItem("token");
    // const res = await axios.delete(`${END_POINT}/api/posts/saved/${postId}`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    // });
    dispatch(filterBookmarks({ postId }));
  } catch (error) {
    console.log(error);
  }
};

export default likesSlice.reducer;
