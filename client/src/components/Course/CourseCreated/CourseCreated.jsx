import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import {toast} from 'react-toastify'

import TextEditor from "../../TextEditor/TextEditor";

import { useDispatch, useSelector } from "react-redux";

import { createCourse, reset } from "../../../redux/slices/courseSlice";

const CourseCreated = () => {
  const {type, token} = useSelector(state => state.auth.user)
  const {isSuccess} = useSelector(state => state.course)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const combinedToken = `${type} ${token}`


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

  const [courseData, setCourseData] = useState(initialCourseState);
  const { courseCode, courseName, courseSemester, clos, assignmentList } = courseData;

  useEffect(() => {
    if(isSuccess) {
      toast.success("Create Course Successfully")
      navigate('/courses')
    }

    dispatch(reset())

  }, [dispatch, isSuccess, navigate])
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCourseData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleInputAssignment = (e, idx) => {
    const { name, value } = e.target;
    setCourseData((prevState) => {
      const updatedAssignments = [...prevState.assignmentList];
      updatedAssignments[idx] = { ...updatedAssignments[idx], [name]: value };

      return {
        ...prevState,
        assignmentList: updatedAssignments,
      };
    });
  };

  const handleTextEditor = (value) => {
    setCourseData((prevState) => ({ ...prevState, clos: value }));
  };

  const semesterInAnArray = [];

  let idx = 1;
  for (let i = moment().year() - 3; i <= moment().year() + 1; i++) {
    for (let j = 1; j <= 3; j++) {
      semesterInAnArray.push(
        <option value={`Semester ${j} - ${i}`} key={idx}>
          Semester {j} - {i}
        </option>
      );
      idx += 1;
    }
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(createCourse({courseData, token: combinedToken}))
  };


  return (
    <div className="course_created_wrapper">
      <div className="course_created p-3">
        <div className=""></div>

        <div className="course_form">
          <form onSubmit={handleSubmitForm}>
            <div className="bg-white p-3">
              <div className="mt-3 p-3">
                <div className="">
                  <h4>Course Information</h4>
                </div>
                <div className="">
                  <div className="mb-3">
                    <label htmlFor="courseCodeInput" className="form-label">
                      Course Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="courseCodeInput"
                      aria-describedby="courseCodeInput"
                      name="courseCode"
                      value={courseCode}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="courseNameInput" className="form-label">
                      Course Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="courseNameInput"
                      aria-describedby="courseNameInput"
                      name="courseName"
                      value={courseName}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="courseSemesterInput" className="form-label">
                      Semester
                    </label>
                    <select
                      className="form-select w-75"
                      aria-label="courseSemesterInput"
                      name="courseSemester"
                      value={courseSemester}
                      onChange={handleInput}
                    >
                      <option value="">-- Select Semester --</option>
                      {semesterInAnArray}
                    </select>
                  </div>
                </div>
              </div>

              <div
                className="accordion p-3"
                id="accordionPanelsStayOpenExample"
              >
                <div className="">
                  <h4>Assessment Detail</h4>
                </div>

                {assignmentList.map((item, idx) => (
                  
                  <div className="accordion-item mt-2" key={item.assignmentNo}>
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          item.assignmentNo === "01" ? "" : "collapsed"
                        }`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#panelsStayOpen-collapse${item.assignmentNo}`}
                        aria-expanded="true"
                        aria-controls={`panelsStayOpen-collapse${item.assignmentNo}`}
                      >
                        Assessment {item.assignmentNo}
                      </button>
                    </h2>
                    <div
                      id={`panelsStayOpen-collapse${item.assignmentNo}`}
                      className={`accordion-collapse collapse ${
                        item.assignmentNo === "01" ? "show" : ""
                      }`}
                    >
                      <div className="accordion-body d-flex justify-content-between">
                        <div className="mb-3 w-100">
                          <label
                            htmlFor="assignmentName01"
                            className="form-label"
                          >
                            Assignment Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="assignmentName01"
                            aria-describedby="assignmentName01"
                            name="assignmentName"
                            value={item.assignmentName}
                            onChange={(e) => handleInputAssignment(e, idx)}
                          />
                        </div>
                        <div className="d-flex ms-4">
                          <div className="mb-3">
                            <label
                              htmlFor="assignmentStartDate01"
                              className="form-label"
                            >
                              Star Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="assignmentStartDate01"
                              name="startDate"
                              value={item.startDate}
                              onChange={(e) => handleInputAssignment(e, idx)}
                            />
                          </div>
                          <div className="mb-3 ms-4">
                            <label
                              htmlFor="assignmentEndDate01"
                              className="form-label"
                            >
                              End Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="assignmentEndDate01"
                              name="endDate"
                              value={item.endDate}
                              onChange={(e) => handleInputAssignment(e, idx)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 p-3">
                <div className="">
                  <h3>Course Learning Object</h3>
                  <p>
                    What do you want learners to take away with after this
                    class?
                  </p>
                </div>

                <div className="course_text_editor">
                  <TextEditor value={clos} onSendValue={handleTextEditor} />
                </div>
              </div>

              <div className="mt-3 p-3 d-flex justify-content-between">
                <Link className="btn btn-primary" to="/courses" reloadDocument>
                  Cancel
                </Link>
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseCreated;
