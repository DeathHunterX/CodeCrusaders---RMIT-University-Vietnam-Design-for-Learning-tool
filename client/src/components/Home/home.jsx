import React from "react";
import { PiBookOpenText } from "react-icons/pi";
import HomeCard from "./HomeCard";
import HomePieChart from "./HomePieChart";
import HomeCourse from "./HomeCourse";

const HomePage = () => {
  const data = [
    {
      id: "ruby",
      label: "ruby",
      value: 198,
      color: "hsl(252, 70%, 50%)",
    },
    {
      id: "elixir",
      label: "elixir",
      value: 473,
      color: "hsl(266, 70%, 50%)",
    },
    {
      id: "c",
      label: "c",
      value: 207,
      color: "hsl(81, 70%, 50%)",
    },
  ];

  return (
    <div className="home">
      <div className="home-1">
        <div className="home-heading">
          <h3>Welcome to Planner Course!</h3>
          <p>Track, manage and share your courses</p>
        </div>
        <div className="d-flex cards justify-content-between">
          <HomeCard title="Total Course" number="12" name="Courses" />
          <HomeCard title="Total Course" number="10" name="Courses" />
          <HomeCard title="Total Course" number="10" name="Courses" />
        </div>
      </div>
      <div className="d-flex home-2">
        <div className="pie-detail">
          <HomePieChart data={data} />
        </div>
        <div className="pie-detail">
          <HomePieChart data={data} />
        </div>
        <div className="list-courses">
          <h5 className="home-course-allCourse">All Courses</h5>
          <HomeCourse title="Introduction to IT" />
          <HomeCourse title="Introduction to IT" />
          <HomeCourse title="Introduction to IT" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
