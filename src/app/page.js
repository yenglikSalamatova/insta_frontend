"use client";
import useAuth from "@/app/store/slice/useAuth";
import LoginPage from "@/components/main/LoginPage";
import { useSelector } from "react-redux";
import PostsPage from "@/components/main/PostsPage";

export default function Home() {
  // FIX: Возможно придется доработать, появляется логин пока грузится currentUser

  useAuth();
  const isAuth = useSelector((state) => state.auth.isAuth);
  console.log(isAuth);
  if (!isAuth) return <LoginPage />;
  return <PostsPage />;
}
