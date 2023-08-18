import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCourse } from '../../../redux/slices/courseSlice'
import { useParams } from 'react-router-dom'

const MoreOptions = () => {
    const [popUpStat, setPopUpStat] = useState(false)
    const [confirmCourse, setConfirmCourse] = useState("")

    const {id} = useParams()

    const {accessToken} = useSelector(state => state.auth.token)
    const {course} = useSelector(state => state.course)
    const dispatch = useDispatch()

    const togglePopUp = () => {
        setPopUpStat(!popUpStat)
    }

    const handleDeleteCourse = (e) => {
        e.preventDefault()
        // Split into courseId and course name and compare
        const regexPattern = /^(.*?)\s-\s(.*)$/;
        const splitArray = confirmCourse.match(regexPattern);
        
        if (splitArray[1] === course.courseCode && splitArray[2] === course.courseName) {
            dispatch(deleteCourse({id, token: accessToken}))
        }
    }

    const handleCancelDelete = () => {
        setConfirmCourse("")
        setPopUpStat(state => !state)
    }


    return (
        <div className='more_options_container'>
            <div className="">
                <button className='btn btn-danger' onClick={togglePopUp}>Delete Course</button>
            </div>

            
            <div className={`popup_form ${popUpStat === true ? 'active' : ''}`}>
                <div className="overlay"></div>
                
                <form className="form_content" onSubmit={handleDeleteCourse}>
                    
                    <div className="form_header mb-4">
                    <div className=" d-flex justify-content-between">
                        <p>Delete course</p>
                        <span style={{cursor: 'pointer'}}><IoClose onClick={handleCancelDelete}/></span>
                    </div>
                    
                    </div>
                    
                    <div className="mb-4">
                        <div className="">
                            <div className="fw-bold mb-2">Delete this course ?</div>
                            There will <span className="fw-bold">be nothing left for this course</span>. This action is
                            irreversible and cannot be undone, not even with fairy dust. <br />
                            Do you want to delete course "{course.courseCode} - {course.courseName}" ?
                        </div>
                      
                    </div>

                    <div>
                        <label htmlFor="">Type "<span className="fw-bold">{course.courseCode} - {course.courseName}</span>"  to confirm</label>
                        <input type="text" className="form-control" id="inputModuleText" aria-describedby="inputModuleText" value={confirmCourse} onChange={e => setConfirmCourse(e.target.value)}/>
                    </div>

                    <div className="form_bottom d-flex mt-4">
                        <button className='btn btn-danger me-2'>Delete Course</button>
                        <span className='btn btn-outline-secondary' onClick={() => handleCancelDelete()}>Cancel</span>
                    </div>
                </form>
                
                
            </div>                
            
        </div>
    )
}

export default MoreOptions