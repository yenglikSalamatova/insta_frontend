import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/utils/endPoint";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    currentUser: null,
    token: null,
    error: null,
  },
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.token = action.payload.token;
      state.error = null;
    },
    logout(state) {
      state.isAuth = false;
      state.currentUser = null;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setError } = authSlice.actions;

export const loginAsync = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post(`${END_POINT}/api/auth/login`, {
      email,
      password,
    });
    if (res.status === 200) {
      const token = res.data.token;
      dispatch(login(token));
    }
  } catch (error) {
    console.log(error);
    if (error.response?.data.error)
      dispatch(setError(error.response.data.error));
    else dispatch(setError(error.message));
  }
};

export default authSlice.reducer;
