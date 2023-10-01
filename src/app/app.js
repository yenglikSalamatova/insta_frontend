"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { END_POINT } from "@/utils/endPoint";
import { login, logout } from "@/app/store/slice/authSlice";
import jwt_decode from "jwt-decode";

export default function App({ children }) {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = () => {
      try {
        console.log("checkAuth");
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
          const decodedToken = jwt_decode(token);
          if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
            const user = {
              ...decodedToken.user,
              profilePicture:
                decodedToken.profilePicture == null
                  ? "/default_avatar.webp"
                  : decodedToken.profilePicture,
            };
            dispatch(login({ token, user, tokenExp: decodedToken.exp }));
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          }
        } else {
          dispatch(logout());
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkAuth();
  }, [dispatch]);
  console.log(isAuth);
  return <div className="app-main">{children}</div>;
}
