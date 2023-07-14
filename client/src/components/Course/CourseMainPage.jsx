import React from 'react'
import {Link} from 'react-router-dom'
import {IoIosAddCircleOutline} from 'react-icons/io'
import CourseCard from './CourseCard'

const CourseMainPage = () => {
  return (
    <div className='course_wrapper '>
        <div className='course_container'>
            <div className="course_title ms-5 mb-3">
                <h2 className="text-uppercase">Courses</h2>
            </div>

            <div className="course_list_wrapper">
                <div className="course_list_container">
                    <div className="course_item course_create_btn">
                        <Link to="/create_course">
                            <div className="card">
                                <div className="course_create_btn_layout">
                                    <IoIosAddCircleOutline/>
                                </div>
                            </div>
                            
                        </Link>
                    </div>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseMainPage