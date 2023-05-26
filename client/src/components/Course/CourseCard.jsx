import React from 'react'
import CourseImgBg from '../../images/Courses/courses_01.jpg'

import {Link} from 'react-router-dom'
import {BsShareFill} from 'react-icons/bs'

const CourseCard = () => {
  return (
      <div className="mb-4 course_item">
        <Link to="/course/01" className="text-decoration-none">
          <div className="card h-100">
              <img src={CourseImgBg} className="card-img-top" alt='' />
              <div className="card-body">
                  <h6 className="card_title">Engineering Capstone Project Part A</h6>
                  <p className="card_text text-uppercase">OENG1183</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="">Semester 1, 2023</small>
                    <div className=""><BsShareFill/></div>
                  </div>
              </div>
          </div>
        </Link>
      </div>
  )
}

export default CourseCard