"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "@/app/store/slice/authSlice";
import axios from "axios";
import { END_POINT } from "@/utils/endPoint";
import jwt_decode from "jwt-decode";

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
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
  }, [dispatch]);
};

export default useAuth;
