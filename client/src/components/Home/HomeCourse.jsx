import React from "react";

export default function HomeCourse({ title }) {
  return (
    <div className="home-course ">
      <div className="d-flex">
        <div className="home-img-course"></div>
        <div className="home-course-info">
          <h5>{title}</h5>
          <h6>August 5th 2023</h6>
        </div>
      </div>
      <div>
        <button className="home-course-button">Analysis</button>
      </div>
    </div>
  );
}
