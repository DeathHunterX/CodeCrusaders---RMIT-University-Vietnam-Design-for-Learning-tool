import React, { useEffect } from "react";

import {useSelector, useDispatch} from "react-redux"
import { getEntireCourses } from "../../redux/slices/courseSlice";
import HomeComponent from "./HomeComponent";

const HomePage = () => {
  const {accessToken} = useSelector(state => state.auth.token);
  // const {allCourses} = useSelector(state => state.auth.module);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntireCourses({token: accessToken}))
  }, [accessToken, dispatch])

  

  return (
    <HomeComponent />
  );
};

export default HomePage;
