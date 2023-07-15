import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {IoIosAddCircleOutline} from 'react-icons/io'
import CourseCard from './CourseCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../redux/slices/courseSlice'


import CourseImgBg from '../../images/Courses/courses_01.jpg'

import {BsShareFill} from 'react-icons/bs'


const CourseMainPage = () => {
    const {type, token} = useSelector(state => state.auth.user)
    const {courses} = useSelector(state => state.course)

    const dispatch = useDispatch()

    const combinedToken = `${type} ${token}`
    useEffect(() => {
        dispatch(getAllCourses(combinedToken))
    }, [combinedToken, dispatch])


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
                        {
                            courses.map((course) => (
                                <CourseCard data={course} key={course.id}/>
                            ))
                        }
                        
                        <div className="course_item">
                            <Link to="/course/01/home" className="text-decoration-none">
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
                        
                    </div>
                </div>
            </div>
        </div>
  )
}

export default CourseMainPage