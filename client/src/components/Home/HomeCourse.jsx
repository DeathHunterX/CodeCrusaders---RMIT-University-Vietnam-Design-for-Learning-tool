import React from "react";

export default function HomeCourse({ title, id, compFunction}) {
  return (
    <div className="home-course my-2">
      <div className="d-flex">
        <div className="col-4">
          <div className="home-img-course"></div>
        </div>
        <div className="col-8">
          <div className="home-course-info">
            <h5>{title}</h5>
            <h6>August 5th 2023</h6>
          </div>
        </div>
        
      </div>
      <div>
        <button className="home-course-button" onClick={() => compFunction(id)}>Analysis</button>
      </div>
    </div>
  );
}
