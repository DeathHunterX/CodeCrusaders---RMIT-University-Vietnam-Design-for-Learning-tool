import React, { useEffect, useState } from 'react'
import TextEditor from '../../../TextEditor/TextEditor'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useSelector } from 'react-redux'

const CourseDetail = () => {
    const initialCourseState = {
        courseCode: "",
        courseName: "",
        courseSemester: "",
        assignmentList: [
          { assignmentNo: "01", assignmentName: "", startDate: "", endDate: "" },
          { assignmentNo: "02", assignmentName: "", startDate: "", endDate: "" },
          { assignmentNo: "03", assignmentName: "", startDate: "", endDate: "" },
        ],
        clos: "",
    };

    const {course} = useSelector(state => state.course)


    useEffect(() => {
        setCourseData((prevState) => ({
            ...prevState,
            courseName: course.courseName ? course.courseName : "",
            courseCode: course.courseCode ? course.courseCode : "",
            courseSemester: course.courseSemester ? course.courseSemester : "",
            assignmentList: course.assignmentList ? [...course.assignmentList].sort((a,b) => parseInt(a.assignmentNo) - parseInt(b.assignmentNo))
            :
            [
                { assignmentNo: "01", assignmentName: "", startDate: "", endDate: "" },
                { assignmentNo: "02", assignmentName: "", startDate: "", endDate: "" },
                { assignmentNo: "03", assignmentName: "", startDate: "", endDate: "" },
            ],
            clos: course.clos ? course.clos : ""
        }))
    }, [course.assignmentList, course.clos, course.courseCode, course.courseName, course.courseSemester])
    
    const [courseData, setCourseData] = useState(initialCourseState)
    const {courseCode, courseName, courseSemester, clos, assignmentList} = courseData


    const handleInput = (e) => {
        const {name, value} = e.target
        setCourseData((prevState) => ({...prevState, [name]: value}))
    }

    const handleInputAssignment = (e, idx) => {
        const {name, value} = e.target
        setCourseData((prevState) => {
            const updatedAssignments = [...prevState.assignmentList]
            console.log()
            updatedAssignments[idx] = {...updatedAssignments[idx], [name]: value};

            return {
                ...prevState,
                assignmentList: updatedAssignments
            };
        })
    }

    const handleTextEditor = (value) => {
        setCourseData((prevState) => ({...prevState, CLOs: value}))
    }

    const semesterInAnArray = []

    let idx = 1
    for(let i = moment().year() - 3; i <= moment().year() + 1; i++) {
        for(let j = 1; j <= 3; j++ ){
            semesterInAnArray.push(
                <option value={`Semester ${j} - ${i}`} key={idx}>
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
    
        <div className="course_edited">
            <form className="course_form m-4" onSubmit={handleSubmitForm}>
                
                <div className="d-flex mb-3">
                    <label htmlFor="courseNameInput" className="form-label" style={{width: '200px'}}>Course Name</label>
                    <input type="text" className="form-control" id="courseNameInput" aria-describedby="courseNameInput"
                    name='courseName' value={courseName} onChange={handleInput} style={{width: '35%'}}
                    />
                </div>

                <div className=" d-flex mb-3">
                    <label htmlFor="courseCodeInput" className="form-label" style={{width: '200px'}}>Course Code</label>
                    <input type="text" className="form-control" id="courseCodeInput" aria-describedby="courseCodeInput" 
                    name='courseCode' value={courseCode} onChange={handleInput} style={{width: '35%'}}
                    />
                </div>

                <div className="d-flex mb-3">
                    <label htmlFor="courseSemesterInput" className="form-label" style={{width: '200px'}}>Semester</label>
                    
                    <select className="form-select" aria-label="courseSemesterInput" 
                    name='courseSemester' value={courseSemester} onChange={handleInput} style={{width: '35%'}}
                    >
                        <option value="">-- Select Semester --</option>
                        {semesterInAnArray}
                    </select>
                    
                </div>
                
            


                <div className="accordion mt-4 mb-4" id="accordionPanelsStayOpenExample">
                    <div className="">
                        <h4>Assessment Detail</h4>
                    </div>

                    {
                        assignmentList.map((item, idx) => (
                        <div className="accordion-item mt-2" key={item.assignmentNo}>
                            <h2 className="accordion-header">
                                <button className={`accordion-button ${item.assignmentNo === '01' ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse${item.assignmentNo}`} aria-expanded="true" aria-controls={`panelsStayOpen-collapse${item.assignmentNo}`}>
                                    Assessment {item.assignmentNo}
                                </button>
                            </h2>
                            <div id={`panelsStayOpen-collapse${item.assignmentNo}`} className={`accordion-collapse collapse ${item.assignmentNo === '01' ? 'show' : ''}`}>
                                <div className="accordion-body d-flex justify-content-between">
                                    <div className="mb-3 w-100">
                                        <label htmlFor="assignmentName01" className="form-label">Name Assignment </label>
                                        <input type="text" className="form-control" id="assignmentName01" aria-describedby="assignmentName01" 
                                        name='assignmentName' value={item.assignmentName ? item.assignmentName : ""} onChange={(e) => handleInputAssignment(e, idx)}/>
                                    </div>
                                    <div className="d-flex ms-4">
                                        <div className="mb-3">
                                            <label htmlFor="assignmentStartDate01" className="form-label">Star Date</label>
                                            <input type="date" className="form-control" id="assignmentStartDate01"
                                            name='startDate' value={item.startDate ? item.startDate : ""} onChange={(e) => handleInputAssignment(e, idx)}/>
                                        </div>
                                        <div className="mb-3 ms-4">
                                            <label htmlFor="assignmentEndDate01" className="form-label">End Date</label>
                                            <input type="date" className="form-control" id="assignmentEndDate01"
                                            name='endDate' value={item.endDate ? item.endDate : ""} onChange={(e) => handleInputAssignment(e, idx)}/>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        ))
                        
                    }
                </div>

                <div className="mt-3">
                    <div className="">
                        <h3>Course Learning Object</h3>
                        <p>What do you want learners to take away with after this class?</p>
                    </div>

                    <div className="course_text_editor">
                        <TextEditor value={clos} onSendValue={handleTextEditor}/>
                    </div>
                </div>
                
                <hr />
                <div className="submit_btn">
                    <div className="mt-3 d-flex justify-content-between">
                        <Link className="btn btn-primary w-25" to="/courses" reloadDocument>Cancel</Link>
                        <button className="btn btn-success w-25" type='submit'>Save</button>
                    </div>
                </div>
                
            </form>
        </div>
    )
}

export default CourseDetail