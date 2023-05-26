import React, {useState} from 'react'
import moment from 'moment'


const CourseCreated = () => {
    const initialState = {
        courseId: '', courseName:'', courseSemester:''
    }
    const [courseData, setCourseData] = useState(initialState)
    const {courseId, courseName} = courseData

    const [semesterState, setSemesterState] = useState(false)

    const handleInputOtherSemester = (e) => {

    }

    const handleInput = (e) => {
        const {name, value} = e.target
        if (name === 'courseSemester' && value === 'other') {
            
            setCourseData({...courseData, [name]: value})
        }
        setCourseData({...courseData, [name]: value})
    }


    return (
        <div className="course_created_wrapper">
            <div className="course_created p-3">
                <div className="">

                </div>
                <div className="course_form">
                    <form>
                        <div className="bg-white p-3">
                            <div className="p-3">
                                <div className="">
                                    <h4>Course Information</h4>
                                </div>
                                <div className="">
                                    <div className="mb-3">
                                        <label htmlFor="courseCodeInput" className="form-label">Course Code</label>
                                        <input type="text" className="form-control" id="courseCodeInput" aria-describedby="courseCodeInput" 
                                        name='courseId' value={courseId} onChange={handleInput}/>
                                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="courseNameInput" className="form-label">Course Name</label>
                                        <input type="email" className="form-control" id="courseNameInput" aria-describedby="courseNameInput"
                                        name='courseName' value={courseName} onChange={handleInput}/>

                                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="courseSemesterInput" className="form-label">Course Semester</label>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <select className="form-select w-75" aria-label="courseSemesterInput" 
                                            name='courseSemester' onChange={handleInput}>
                                                <option defaultValue="">-- Select Semester --</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <p> - {moment().year()}</p>
                                        </div>
                                        
                                        {

                                        }
                                        <input type="text" className="form-control" id="courseSemesterInput" aria-describedby="courseSemesterInput" />
                                        
                                    </div>
                                </div>
                            </div>

                            <div className="accordion p-3" id="accordionPanelsStayOpenExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                            Course Information
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item mt-2">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                            Course Information
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                                        <div className="accordion-body">
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item mt-2">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                            Course Information
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                                        <div className="accordion-body">
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                            
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CourseCreated