"use client";
import { Provider } from "react-redux";
import store from "./store";
// import { initializeApp } from "@/app/store/slice/authSlice";

// const dispatch = store.dispatch;
// dispatch(initializeApp());

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
