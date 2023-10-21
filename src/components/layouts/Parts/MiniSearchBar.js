"use client";
import styles from "@/styles/searchBar.module.scss";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "@/app/store/slice/searchSlice";
import Link from "next/link";
import { END_POINT } from "@/utils/endPoint";

export default function MiniSearchBar({
  setSearchInput,
  onClose,
  searchInput,
}) {
  const searchRef = useRef(null);

  const dispatch = useDispatch();

  const { search } = useSelector((state) => state.search);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  useEffect(() => {
    dispatch(searchUsers(searchInput));
  }, [dispatch, searchInput]);

  return (
    <div className={styles.search_mini} ref={searchRef}>
      <div className={styles.search_results}>
        {search.map((item) => (
          <Link
            href={`/profile/${item.username}`}
            key={item.id}
            className={styles.search_card}
          >
            <img
              src={`${END_POINT}/${item.profilePicture}`}
              width={18}
              height={18}
              alt="Search Icon"
            />
            <div>
              <p>{item.username}</p>
              <p>{item.full_name}</p>
            </div>
          </Link>
        ))}
        {search.length === 0 && (
          <p className={styles.no_results}>Ничего не найдено</p>
        )}
      </div>
    </div>
  );
}
