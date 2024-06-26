"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { login, logout } from "@/app/store/slice/authSlice";
import { END_POINT } from "@/utils/endPoint";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import StoriesByIdSkeleton from "../stories/StoriesByIdSkeleton";

export default function WithAuth({ children, layout }) {
  const [loading, setLoading] = useState(true);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const dispatch = useDispatch();
  const router = useRouter();

  const checkAuth = async () => {
    try {
      // console.log("checkAuth");
      const token = localStorage.getItem("token");

      if (token) {
        const decodedToken = jwt_decode(token);
        if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
          const res = await axios.get(
            `${END_POINT}/api/users/${decodedToken.user.username}`
          );
          if (res.status === 200) {
            const user = res.data;
            dispatch(login({ token, user }));
            setLoading(false);
          }
        }
      } else {
        dispatch(logout());
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    if (layout === "stories") {
      return <StoriesByIdSkeleton />;
    }
    return <Spinner />;
  } else if (isAuth) {
    return children;
  } else {
    router.push("/login");
  }
}
