"use client";

import StoriesBlock from "@/components/StoriesBlock";
import PostsBlock from "@/components/PostsBlock";
import RightSideBar from "@/components/RightSideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFollowedPosts } from "@/app/store/slice/postsSlice";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const generateData = (n) => {
  const data = [];
  for (let index = 0; index < n; index++) {
    data.push({
      id: index,
      username: `user${index + 1}`,
      imageUrl: `https://loremflickr.com/320/240/${index}`,
    });
  }
  return data;
};

const generateRandomDate = () => {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - 30); // Начало интервала - 30 дней назад

  const randomTime =
    startDate.getTime() +
    Math.random() * (currentDate.getTime() - startDate.getTime());
  const randomDate = new Date(randomTime);

  return randomDate.toISOString();
};

const generatePosts = (n) => {
  const data = [];
  for (let i = 0; i < n; i++) {
    const post = {
      id: i + 1,
      username: `user${i + 1}`,
      userImage: `https://loremflickr.com/320/240/${i}`,
      story: Math.random() < 0.5,
      media: `https://loremflickr.com/800/800/${i}`,
      mediaType: "image",
      caption: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
      dignissim, elit at mollis pellentesque, neque turpis tempor urna, at
      bibendum orci neque et neque. (Пост ${i + 1})`,
      commentCount: Math.floor(Math.random() * 100),
      likes: Math.floor(Math.random() * 1000),
      timestamp: generateRandomDate(), // Генерируем случайную дату публикации
    };
    data.push(post);
  }
  return data;
};

// Генерируем 10 постов

const PostsPage = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const posts = useSelector((state) => state.posts.posts);
  const storiesData = generateData(10);
  const instagramPosts = generatePosts(10);

  const dispatch = useDispatch();

  useEffect(() => {
    // FIX: Фильтрация в бэке по времени
    dispatch(getFollowedPosts());
  }, [dispatch]);

  return (
    <div className="container-main">
      {currentUser && posts && (
        <>
          <NavBar currentUser={currentUser} />
          <div className="container">
            <main className="main">
              <StoriesBlock stories={storiesData} />
              <PostsBlock posts={posts} />
            </main>
            <RightSideBar currentUser={currentUser} />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default PostsPage;
