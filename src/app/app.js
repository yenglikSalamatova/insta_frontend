"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { END_POINT } from "@/utils/endPoint";
import { login, logout, getUserByUsername } from "@/app/store/slice/authSlice";
import jwt_decode from "jwt-decode";

export default function App({ children }) {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // console.log("checkAuth");
        const token = localStorage.getItem("token");
        // console.log(token);
        if (token) {
          const decodedToken = jwt_decode(token);
          if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
            // console.log(decodedToken);
            const res = await axios.get(
              `${END_POINT}/api/users/${decodedToken.user.username}`,
              {}
            );
            if (res.status === 200) {
              const user = res.data;
              dispatch(login({ token, user, tokenExp: decodedToken.exp }));
            }
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
  // console.log(isAuth);
  return <div className="app-main">{children}</div>;
}
