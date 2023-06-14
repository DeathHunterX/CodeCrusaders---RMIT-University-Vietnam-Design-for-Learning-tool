import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import TextEditor from '../../TextEditor/TextEditor'


const CourseCreated = () => {
    // const navigate = useNavigate()

    const initialCourseState = {
        courseId: '', 
        courseName:'', 
        courseSemester:'', 
        assignment: [
            {idxNo: '01', assignmentName: '', startDate: '', endDate: ''},
            {idxNo: '02', assignmentName: '', startDate: '', endDate: ''},
            {idxNo: '03', assignmentName: '', startDate: '', endDate: ''}
        ], 
        CLOs: ''
    }
    

    const [courseData, setCourseData] = useState(initialCourseState)
    const {courseId, courseName, CLOs, assignment, assignmentName, startDate, endDate} = courseData


    const handleInput = (e) => {
        const {name, value} = e.target
        setCourseData({...courseData, [name]: value})
    }

    const handleInputAssignment = (e, idx) => {
        const {name, value} = e.target
        const assignmentList = [...assignment]
        assignmentList[idx][name] = value
        setCourseData({...courseData, assignment: assignmentList})
    }

    const handleTextEditor = (value) => {
        setCourseData({...courseData, CLOs: value})
    }

    const semesterInAnArray = []

    let idx = 1
    for(let i = moment().year(); i <= moment().year() + 1; i++) {
        for(let j = 1; j <= 3; j++ ){
            semesterInAnArray.push(
                <option value={`${j} - ${i}`} key={idx}>
                    Semester {j} - {i}
                </option>
            )
            idx += 1
        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        console.log(courseData)

    }
    return (
        <div className="course_created_wrapper">
            <div className="course_created p-3">
                <div className="">

                </div>

                <div className="course_form">
                    <form onSubmit={handleSubmitForm}>
                        <div className="bg-white p-3">
                            <div className="mt-3 p-3">
                                <div className="">
                                    <h4>Course Information</h4>
                                </div>
                                <div className="">
                                    <div className="mb-3">
                                        <label htmlFor="courseCodeInput" className="form-label">Course Code</label>
                                        <input type="text" className="form-control" id="courseCodeInput" aria-describedby="courseCodeInput" 
                                        name='courseId' value={courseId} onChange={handleInput}/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="courseNameInput" className="form-label">Course Name</label>
                                        <input type="text" className="form-control" id="courseNameInput" aria-describedby="courseNameInput"
                                        name='courseName' value={courseName} onChange={handleInput}/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="courseSemesterInput" className="form-label">Semester</label>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <select className="form-select w-75" aria-label="courseSemesterInput" 
                                            name='courseSemester' onChange={handleInput}>
                                                <option value="">-- Select Semester --</option>
                                                {semesterInAnArray}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="accordion p-3" id="accordionPanelsStayOpenExample">
                                <div className="">
                                    <h4>Assessment Detail</h4>
                                </div>

                                {
                                    assignment.map((item, idx) => (
                                    <div className="accordion-item mt-2" key={item.idxNo}>
                                        <h2 className="accordion-header">
                                            <button className={`accordion-button ${item.idxNo === '01' ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse${item.idxNo}`} aria-expanded="true" aria-controls={`panelsStayOpen-collapse${item.idxNo}`}>
                                                Assessment {item.idxNo}
                                            </button>
                                        </h2>
                                        <div id={`panelsStayOpen-collapse${item.idxNo}`} className={`accordion-collapse collapse ${item.idxNo === '01' ? 'show' : ''}`}>
                                            <div className="accordion-body d-flex justify-content-between">
                                                <div className="mb-3 w-100">
                                                    <label htmlFor="assignmentName01" className="form-label">Name Assignment </label>
                                                    <input type="text" className="form-control" id="assignmentName01" aria-describedby="assignmentName01" 
                                                    name='assignmentName' value={assignmentName} onChange={(e) => handleInputAssignment(e, idx)}/>
                                                </div>
                                                <div className="d-flex ms-4">
                                                    <div className="mb-3">
                                                        <label htmlFor="assignmentStartDate01" className="form-label">Star Date</label>
                                                        <input type="date" className="form-control" id="assignmentStartDate01"
                                                        name='startDate' value={startDate} onChange={(e) => handleInputAssignment(e, idx)}/>
                                                    </div>
                                                    <div className="mb-3 ms-4">
                                                        <label htmlFor="assignmentEndDate01" className="form-label">End Date</label>
                                                        <input type="date" className="form-control" id="assignmentEndDate01"
                                                        name='endDate' value={endDate} onChange={(e) => handleInputAssignment(e, idx)}/>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    ))
                                }
                                
                            </div>

                            <div className="mt-3 p-3">
                                <div className="">
                                    <h3>Course Learning Object</h3>
                                    <p>What do you want learners to take away with after this class?</p>
                                </div>

                                <div className="course_text_editor">
                                    <TextEditor value={CLOs} onSendValue={handleTextEditor}/>
                                </div>
                            </div>

                            <div className="mt-3 p-3 d-flex justify-content-between">
                                <Link className="btn btn-primary" to="/courses" reloadDocument>Cancel</Link>
                                <button className="btn btn-success" type='submit'>Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CourseCreated