import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/utils/endPoint";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";

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
      state.tokenExp = action.payload.tokenExp;
      state.currentUser = action.payload.user;
      state.error = null;
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;
      localStorage.setItem("token", action.payload.token);
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
    setNewCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { login, logout, setError, setNewCurrentUser } = authSlice.actions;

export const loginAsync = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post(`${END_POINT}/api/auth/login`, {
      email,
      password,
    });
    if (res.status === 200) {
      const { token } = res.data;
      if (token) {
        const decodedToken = jwt_decode(token);
        if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
          const user = {
            ...decodedToken.user,
          };
          dispatch(login({ token, user, tokenExp: decodedToken.exp }));
        }
      }
    }
  } catch (error) {
    console.log(error);
    if (error.response?.data.error)
      dispatch(setError(error.response.data.error));
    else dispatch(setError(error.message));
  }
};

export const editUser = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.patch(`${END_POINT}/api/users`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    if (res.status === 200) {
      dispatch(setNewCurrentUser(res.data));
    }
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
      dispatch(setNewCurrentUser(res.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export default authSlice.reducer;
