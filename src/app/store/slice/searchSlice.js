import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/utils/endPoint";
import { useDispatch } from "react-redux";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: [],
    error: null,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSearch, setError } = searchSlice.actions;

export const searchUsers = (query) => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/users/search?q=${query}`);
    dispatch(setSearch(res.data));
  } catch (error) {
    console.log(error);
    setError(error.message);
  }
};

export default searchSlice.reducer;
