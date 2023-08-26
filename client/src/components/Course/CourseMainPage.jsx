import { useEffect} from 'react'
import {Link} from 'react-router-dom'

import {IoIosAddCircleOutline} from 'react-icons/io'

import CourseCard from './CourseCard'

import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses} from '../../redux/slices/courseSlice'

const CourseMainPage = () => {
    const {accessToken} = useSelector(state => state.auth.token)
    const {courses} = useSelector(state => state.course)
    const dispatch = useDispatch()

    
    useEffect(() => {
        dispatch(getAllCourses(accessToken))

    }, [accessToken, dispatch])


    return (
        <div className='course_wrapper '>
            <div className='course_container'>
                <div className="course_title mb-3">
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
                            courses ? courses.map((course) => (
                                <CourseCard data={course} key={course.id}/>
                            ))
                            :
                            <></>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
  )
}

export default CourseMainPage