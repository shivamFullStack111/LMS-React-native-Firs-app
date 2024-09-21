import React, { useEffect, useState } from "react";
import NotForLogin from "./z_components/notForlogin/NotForLogin";
import ForLogin from "./z_components/forlogin/ForLogin";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  setcourses,
  setisauthenticated,
  setuser,
} from "./store/Slices/userSlice";

const App = () => {
  const { isauthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const remove = async () => {
  //     await AsyncStorage.removeItem("Token");
  //   };
  //   remove();
  // }, []);

  // cheack authentication
  useEffect(() => {
    const checkIsAuthenticated = async () => {
      try {
        const token = await AsyncStorage.getItem("Token");
        if (!token) return;
        else {
          const res = await axios.get(
            "http://192.168.169.216:8000/isauthenticated",
            { headers: { Authorization: token } }
          );

          if (res.data.success) {
            dispatch(setisauthenticated(true));
            dispatch(setuser(res.data.user));
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    checkIsAuthenticated();
  }, []);

  //get all courses
  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await axios.get(
          "http://192.168.169.216:8000/get-all-courses"
        );
        dispatch(setcourses(res.data.courses || []));
      } catch (error) {
        console.log(error.message);
      }
    };
    getCourses();
  }, []);

  if (isauthenticated) {
    return <NotForLogin />;
  } else {
    return <ForLogin />;
  }
};

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
