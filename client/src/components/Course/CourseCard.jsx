import React from 'react'
import CourseImgBg from '../../images/Courses/courses_01.jpg'

import {Link} from 'react-router-dom'
import {BsShareFill} from 'react-icons/bs'

const CourseCard = ({data}) => {
  return (
      <div className="course_item">
        <Link to={`/course/${data.id}/home`} className="text-decoration-none">
          <div className="card h-100">
            <img src={CourseImgBg} className="card-img-top" alt='' />
            <div className="card-body d-flex flex-column justify-content-between">
                <h6 className="card_title">{data.courseName}</h6>
                <div className="">
                  <p className="card_text text-uppercase">OENG1183</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="">{data.semester}</small>
                    <div className=""><BsShareFill/></div>
                  </div>
                </div>
                
            </div>
          </div>
        </Link>
      </div>
  )
}  
export default CourseCard