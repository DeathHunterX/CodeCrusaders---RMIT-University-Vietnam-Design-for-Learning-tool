// Import Library
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {DragDropContext} from '@hello-pangea/dnd';
import { Resizable } from 're-resizable';
import { toast } from 'react-toastify';

// Redux
import { createModule} from '../../redux/slices/moduleSlice';
import { deleteActivity, resetSessionState, updateSessions } from '../../redux/slices/sessionSlice';


// Import Components
import CoursePlannerHeader from './Item/Header';

import PopUpForm from './PopUp/PopUpForm';

import CoursePlanner from './CoursePlanner';

// Icons
import {FaClipboardList} from 'react-icons/fa';


import ModuleComponent from './Module/ModuleComponent';
import ModuleInfo from './ModuleInfo/Info';
import CourseOverview from './CourseOverview/Overview';
import ModuleDashboard from './ModuleDashboard/Dashboard';


const PlannerComponent = () => {
  const initialState = [
    { 
      id:"",
      totalDuration: 0,
      sessionName: 'Pre-class', 
      activityList: [] 
    },
    { 
      id: "",
      totalDuration: 0,
      sessionName: 'In-class', 
      activityList: []
    },
    { 
      id: "",
      totalDuration: 0,
      sessionName: 'Post-class', 
      activityList: []
    }
  ] 

  const [activitiesData, setActivitiesData] = useState(initialState)
  const [activitiesDataAfterUpdated, setActivitiesDataAfterUpdated] = useState({})

  // Handle pop up form
  const [popUpStat, setPopUpStat] = useState({
    state: false,
    formName: ""
  })

  // handle module data
  const [moduleData, setModuleData] = useState({moduleName: ""})

  // handle activity windows add or edit state
  const [activityType, setActivityType] = useState({
    state: "",   // add or edit state
    board: ""
  })  
  // handle card data for edit
  const [editedItm, setEditedItm] = useState({})

  // handle state
  const [activeSection, setActiveSection] = useState(1)

  // fetch action
  const {accessToken} = useSelector(state => state.auth.token)
  const {sessions} = useSelector(state => state.session)
  const {isCreated, isDeleted, isSessionUpdated, isError, message} = useSelector(state => state.session)
  const dispatch = useDispatch();


  useEffect(() => {
    
    setActivitiesData(sessions)
  }, [sessions]);


  const {id, subPage, subId} = useParams();
  const navigate = useNavigate();



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

  const handleClosePopUp = () => {
    if (popUpStat.formName === "module") {
      setModuleData({moduleName: ""});
    };

    setPopUpStat(prevState => ({
      ...prevState,
      state: !prevState.state,
      formName: ""
    }))
  }

  const [deletedCard, setDeletedCard] = useState({boardData: {}, activityID: ""})

  // functions
  const deleteCardInBoard = (boardData, activityID) => {
    setDeletedCard(prevState => ({...prevState, boardData: boardData, activityID: activityID}));

    dispatch(deleteActivity({courseID: id, sessionID: boardData.id, activityID: activityID, token: accessToken}));
  }


  const transformAndRename = (sessionData) => {
    const transformedData = sessionData.reduce((result, session) => {
      const { id, sessionName, activityList } = session;
      const sessionKey = `${sessionName.toLowerCase()}Id`;
      const activitiesKey = `${sessionName.toLowerCase()}Activities`;
  
      result[sessionKey] = id;
      result[activitiesKey] = activityList;
  
      return result;
    }, {});
  
    const finalTransformedData = {
      preClassId: transformedData.pre_classId,
      preClassActivities: transformedData.pre_classActivities,
      inClassId: transformedData.in_classId,
      inClassActivities: transformedData.in_classActivities,
      postClassId: transformedData.post_classId,
      postClassActivities: transformedData.post_classActivities,
    };
  
    return finalTransformedData;
  };

  

  const configMap = [
      {
          header: 'Course Overview', 
          restricted: false,
          icon: <FaClipboardList/>
      }, 
      {
          header: 'Module Board', 
          restricted: false,
          icon: <FaClipboardList/>
      },
      {
        header: "Module Dashboard", 
        restricted: true,
        icon: <FaClipboardList/>
      },
      {
        header: "Module Info", 
        restricted: true,
        icon: <FaClipboardList/>
    },
  ]

  const onDragEnd = (result) => {
      if (!result.destination) return;
      const { source, destination } = result;

      const sourceBoardIndex = activitiesData.findIndex(board => board.sessionName === source.droppableId);
      const destinationBoardIndex = activitiesData.findIndex(board => board.sessionName === destination.droppableId);

      if (sourceBoardIndex === -1 || destinationBoardIndex === -1) {
        return;
      }

      const updatedBoards = activitiesData.map(board => ({
        ...board,
        activityList: [...board.activityList]
      }));
      
      const [movedItem] = updatedBoards[sourceBoardIndex].activityList.splice(source.index, 1);
      updatedBoards[destinationBoardIndex].activityList.splice(destination.index, 0, movedItem);
      
      const finalData = transformAndRename(updatedBoards);
      
      dispatch(updateSessions({courseID: id, moduleID: subId, sessionData: finalData, token: accessToken}))
      
      setActivitiesDataAfterUpdated(updatedBoards);
  };

  useEffect(() => {
    if(isDeleted) {
      setActivitiesData(prevState => prevState.map((board) => {
        if (board.sessionName === deletedCard.boardData?.sessionName) {
          const updatedData = board.activityList.filter((activity) => activity.id !== deletedCard.activityID);
          return {
            ...board,
            activityList: updatedData,
          };
        }
        return board;
      }));
      dispatch(resetSessionState())
    } else if (isSessionUpdated) {
      setActivitiesData(activitiesDataAfterUpdated)
      // Empty object after transfer data into main sessions data
      setActivitiesDataAfterUpdated({})
      dispatch(resetSessionState())
    } else if(isError) {
      toast.error(message)
      dispatch(resetSessionState())
    }
  }, [activitiesData, activitiesDataAfterUpdated, deletedCard.activityID, deletedCard.boardData?.sessionName, dispatch, isCreated, isDeleted, isError, isSessionUpdated, message])

  useEffect(() => {
    // dispatch(addUpdateSessionState(activitiesData))
  }, [activitiesData, dispatch])

  const handleGoBackToCoursePage = () => {
      navigate(`/courses`)
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

  const ActivityHeaderData = { subPage, configMap, activeSection, activitiesData }
  const ActivityHeaderFunction = { setActiveSection, handleGoBackToCoursePage }

  const ActivityPlanningData = {width2, activitiesData}
  const ActivityPlanningFunction = {
      openAddEditDialog, 
      setEditedItm, 
      deleteCardInBoard,
      setActivitiesData
  }

  const PopUpFormData = {popUpStat, moduleData, activityType, editedItm, activitiesData}
  const PopUpFormFunction = {handleSubmitForm, handleClosePopUp, handleChangeInput, setActivitiesData}

  return (
      <DragDropContext onDragEnd={onDragEnd}>
          <div className="course_planner_wrapper">
              <CoursePlannerHeader activityData={ActivityHeaderData} activityFunction={ActivityHeaderFunction} />
              <div className="course_planner_container">
                {
                  activeSection === 0 && <CourseOverview />
                }
                {
                  (activeSection === 1 || activeSection === 2 || activeSection === 3 ) && 
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
                
                {
                  (activeSection === 2 && subPage === "modules") && <ModuleDashboard width={width2}/>
                }

                {
                  (activeSection === 3 && subPage === "modules") && <ModuleInfo width={width2}/>
                }
                  
              </div>

              <PopUpForm activityData={PopUpFormData} activityFunction={PopUpFormFunction}/>
          </div>
      </DragDropContext>
  )
}

export default PlannerComponent