import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/utils/endPoint";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";

// FIX: localStorage

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    token: null,
    currentUser: null,
    tokenExp: null,
    error: null,
  },
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.token = action.payload.token;
      state.currentUser = action.payload.user;
      state.tokenExp = action.payload.tokenExp;
      state.error = null;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.isAuth = false;
      state.currentUser = null;
      state.error = null;
      state.token = null;
      delete axios.defaults.headers.common["Authorization"];
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
      const { token } = res.data;
      dispatch(login({ token }));
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  } catch (error) {
    console.log(error);
    if (error.response?.data.error)
      dispatch(setError(error.response.data.error));
    else dispatch(setError(error.message));
  }
};

export default authSlice.reducer;
