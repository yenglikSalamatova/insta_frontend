"use client";

import LoginPage from "@/components/main/LoginPage";
import PostsPage from "@/components/main/PostsPage";
import { useSelector, useDispatch } from "react-redux";
export default function Home() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return <div>{isAuth ? <PostsPage /> : <LoginPage />}</div>;
}
