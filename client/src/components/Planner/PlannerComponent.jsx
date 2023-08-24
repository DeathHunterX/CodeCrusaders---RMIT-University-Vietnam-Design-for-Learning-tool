// Import Library
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {DragDropContext} from '@hello-pangea/dnd'

// Redux
import { createModule, getModuleInfo, getModules } from '../../redux/slices/moduleSlice'
import { getCourse } from '../../redux/slices/courseSlice';

// Import Components

import BasicInformation from './BasicInformation/BasicInformation'
import CoursePlanner from './CoursePlanner'

// Icons
import {FaClipboardList} from 'react-icons/fa'

// Icon Settings
import SettingComponent from './Overview/SettingComponent';
import CoursePlannerHeader from './Item/Header';
import PopUpForm from './PopUp/PopUpForm'
import { Resizable } from 're-resizable'
import ModuleComponent from './Module/ModuleComponent'


const PlannerComponent = () => {
  const initialState = [
    { 
      sessionName: 'Pre-class', 
      activityList: [] 
    },
    { 
      sessionName: 'In-class', 
      activityList: [] 
    },
    { 
      sessionName: 'Post-class', 
      activityList: []
    }
  ] 

  const [activitiesData, setActivitiesData] = useState(initialState)

  // Handle pop up form
  const [popUpStat, setPopUpStat] = useState({
    state: false,
    formName: ""
  })

  // const [sessionBoard, setSessionBoard] = useState(activitiesData[0].sessionName)
  
  const [moduleData, setModuleData] = useState({moduleName: ""})

  const [activityType, setActivityType] = useState({
    state: "",   // add or edit state
    board: ""
  })  

  // console.log(activitiesData)

  useEffect(() => {

  }, [])
  // handle data

  
  // handle state
  const [activeSection, setActiveSection] = useState(1)
  const [editedItm, setEditedItm] = useState('')

  // fetch action
  const {accessToken} = useSelector(state => state.auth.token)
  const {course} = useSelector(state => state.course)
  const {moduleItem} = useSelector(state => state.module)

  const dispatch = useDispatch();

  const {page, id, subPage, subId} = useParams();
  const navigate = useNavigate();

  // Get Course
  useEffect(() => {
      dispatch(getCourse({id: id, token: accessToken}))
  }, [accessToken, dispatch, id])

  // Get All Modules
  useEffect(() => {
      dispatch(getModules({id: id, token: accessToken}))
  }, [accessToken, dispatch, id])
  
  // Get Module
  useEffect(() => {
    if (Object.keys(moduleItem).length === 0){
      dispatch(getModuleInfo({id: subId, token: accessToken}))   
    }
  }, [accessToken, dispatch, moduleItem, subId])
  

  // Module CRUD Functions
  const handleChangeInput = (e) => {
      const {name, value} = e.target
      setModuleData(prevState => ({...prevState, [name]: value}))
  }

  const handleSubmitForm = (e) => {
      e.preventDefault()
      dispatch(createModule({moduleData: moduleData, id: id, token: accessToken}))

      setModuleData({moduleName: ""})
      setPopUpStat(false)
  }

  const openAddEditDialog = (type, board) => {
    setPopUpStat(prevState => ({
      ...prevState,
      state: !prevState.state,
      formName: "activity"
    }))

    setActivityType(prevState => ({
      ...prevState,
      state: type,
      board: board
    }))
  }

  const handleClosePopUp = (e) => {
    if (popUpStat.formName === "module") {
      setModuleData({moduleName: ""});
    };

    setPopUpStat(prevState => ({
      ...prevState,
      state: !prevState.state,
      formName: ""
    }))
  }

  // functions
  const deleteRightCard = (boardName, id) => {
      const updatedActivitiesData = activitiesData.map((board) => {
          if (board.name === boardName) {
            const updatedData = board.data.filter((activity) => activity.id !== id);
            return {
              ...board,
              data: updatedData,
            };
          }
          return board;
      });
    
      setActivitiesData(updatedActivitiesData);

  }

  const configMap = [
      {
          header: 'Course Overview', 
          icon: <FaClipboardList/>
      }, 
      {
          header: 'Module Board', 
          icon: <FaClipboardList/>
      },
      {
          header: "Module Info", 
          icon: <FaClipboardList/>
      },
      {
        header: "Module Dashboard", 
        icon: <FaClipboardList/>
      },
  ]



  // const filteredBoards = activitiesData.filter((board) => board.name === activeTabs);

  // const handleEditedData = (activitiesData.find((board) => board.name === activeTabs) || { data: [] }).data.find((activity) => activity.id === editedItm)
  

  const insertItemAtIndex = (array, item, index) => {
      const newArray = [...array];
      newArray.splice(index, 0, item);
      return newArray;
  };

  const onDragEnd = (result) => {
      if (!result.destination) return;
  
      const { source, destination } = result;
  };

  const handleGoBackToCoursePage = () => {
      navigate(`/courses`)
  }

  const handlePreviewData = () => {
      navigate(`/down-preview`)
  }

  // Resizable
  // Initial widths
  const initialWidth1 = 15;
  const initialWidth2 = 100 - initialWidth1;

  const minWidthVal = 12;
  const maxWidthVal = 18;

  // State to track the widths of the boxes
  const [width1, setWidth1] = useState(initialWidth1);
  const [width2, setWidth2] = useState(initialWidth2);

  // Handle resizing of Box 1 (resizable only on the right side)
  const handleResize1 = (event, direction, ref, delta) => {
      // Calculate new widths
      const newWidth1 = width1 + delta.width;
      const newWidth2 = 100 - newWidth1;


      // Update state while respecting minWidth and maxWidth
      if (newWidth1 >= minWidthVal && newWidth1 <= maxWidthVal) {
          setWidth1(newWidth1);
          setWidth2(newWidth2);
      }
  }





  const ActivityHeaderFunction = { setActiveSection, handleGoBackToCoursePage, handlePreviewData }
  const ActivityHeaderData = { subPage, configMap, activeSection }

  const ActivityPlanningFunction = {
      openAddEditDialog, 
      setEditedItm, 
      deleteRightCard
  }
  const ActivityPlanningData = {width2, activitiesData}

  const PopUpFormData = {popUpStat, moduleData, activityType, activitiesData}
  const PopUpFormFunction = {handleSubmitForm, handleClosePopUp, handleChangeInput, setActivitiesData}

  return (
      <DragDropContext onDragEnd={onDragEnd}>
          <div className="course_planner_wrapper">
              <CoursePlannerHeader activityData={ActivityHeaderData} activityFunction={ActivityHeaderFunction} />
              <div className="course_planner_container">
                {
                  activeSection === 0 && <SettingComponent />
                }
                {
                  (activeSection === 1 || activeSection === 2) && 
                  <Resizable
                    onResize={handleResize1}
                    defaultSize={{ width: `${width1}%` }}
                    minWidth={`${minWidthVal}%`}
                    maxWidth={`${maxWidthVal}%`}
                    enable={{ right: true }}
                    style={{ borderRight: '2px solid black' }}
                  >
                    <ModuleComponent courseID={id} dispatch={dispatch} setPopUpStat={setPopUpStat}/>
                  </Resizable>
                }
                {
                  (activeSection === 1 && subPage === "modules") &&
                    <CoursePlanner activityData={ActivityPlanningData} activityFunction={ActivityPlanningFunction}/>
                }
                {/* {
                  (activeSection === 2 && subPage === "modules") && <BasicInformation data={moduleItem} width={width2}/>
                } */}
                  
              </div>

              <PopUpForm activityData={PopUpFormData} activityFunction={PopUpFormFunction}/>
          </div>
      </DragDropContext>
  )
}

export default PlannerComponent