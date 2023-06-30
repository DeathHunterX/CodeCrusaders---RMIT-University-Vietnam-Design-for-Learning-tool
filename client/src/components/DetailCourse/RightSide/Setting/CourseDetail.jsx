import React, { useEffect, useState } from 'react'
import TextEditor from '../../../TextEditor/TextEditor'
import { Link } from 'react-router-dom'
import moment from 'moment'
const CourseDetail = () => {
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
    const {courseId, courseName, courseSemester, CLOs, assignment} = courseData

    useEffect(() => {
        // Simulating API call with setTimeout
        const fetchData = () => {
          // Replace this with your actual API call
          setTimeout(() => {
            const apiData = {
              courseId: 'BP306',
              courseName: 'Engineering Capstone Project Part A',
              courseSemester: '1 - 2023',
              assignment: [
                { idxNo: '01', assignmentName: 'Project Proposal', startDate: '', endDate: '' },
                { idxNo: '02', assignmentName: 'Project Finalize', startDate: '', endDate: '' },
                { idxNo: '03', assignmentName: 'Presentation + Demo', startDate: '', endDate: '' }
              ],
              CLOs: 'Hello'
            };
            setCourseData(apiData);
          }, 1000); // Delay of 1 second for demonstration purposes
        };
    
        fetchData();
    }, []);

    const handleInput = (e) => {
        const {name, value} = e.target
        setCourseData((prevState) => ({...prevState, [name]: value}))
    }

    const handleInputAssignment = (e, idx) => {
        const {name, value} = e.target
        setCourseData((prevState) => {
            const updatedAssignments = [...prevState.assignment]
            updatedAssignments[idx] = {...updatedAssignments[idx], [name]: value};

            return {
                ...prevState,
                assignment: updatedAssignments
            };
        })
    }

    const handleTextEditor = (value) => {
        setCourseData((prevState) => ({...prevState, CLOs: value}))
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
                    name='courseId' value={courseId} onChange={handleInput} style={{width: '35%'}}
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
                                        name='assignmentName' value={item.assignmentName} onChange={(e) => handleInputAssignment(e, idx)}/>
                                    </div>
                                    <div className="d-flex ms-4">
                                        <div className="mb-3">
                                            <label htmlFor="assignmentStartDate01" className="form-label">Star Date</label>
                                            <input type="date" className="form-control" id="assignmentStartDate01"
                                            name='startDate' value={item.startDate} onChange={(e) => handleInputAssignment(e, idx)}/>
                                        </div>
                                        <div className="mb-3 ms-4">
                                            <label htmlFor="assignmentEndDate01" className="form-label">End Date</label>
                                            <input type="date" className="form-control" id="assignmentEndDate01"
                                            name='endDate' value={item.endDate} onChange={(e) => handleInputAssignment(e, idx)}/>
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
                        <TextEditor value={CLOs} onSendValue={handleTextEditor}/>
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