import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/utils/endPoint";
import jwt_decode from "jwt-decode";

let initialState = {
  isAuth: false,
  token: null,
  currentUser: null,
};

if (localStorage.getItem("token")) {
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  if (decodedToken) {
    if (decodedToken.exp * 1000 > Date.now()) {
      initialState = {
        isAuth: true,
        // не хранить чувствительные данные ----- ДОРАБОТАТЬ
        currentUser: JSON.parse(localStorage.getItem("user")),
        token,
      };
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }
  // console.log(initialState);
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.token = action.payload.token;
      state.error = null;
      state.currentUser = action.payload.user;
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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
      const token = res.data.token;
      const user = res.data.user;
      dispatch(login(token, user));
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  } catch (error) {
    console.log(error);
    if (error.response?.data.error)
      dispatch(setError(error.response.data.error));
    else dispatch(setError(error.message));
  }
};

// export const initializeApp = () => (dispatch) => {
//   const isAuth = localStorage.getItem("isAuth");
//   if (isAuth) {
//     dispatch(login());
//   }
// };

export default authSlice.reducer;
