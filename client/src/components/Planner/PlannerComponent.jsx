// Import Library
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {DragDropContext} from '@hello-pangea/dnd'


// Redux
import { createModule, getModules } from '../../redux/slices/moduleSlice'
import { getCourse } from '../../redux/slices/courseSlice';



// Import Components
import ActivityWindow from './Activity/ActivityWindow/ActivityWindow'

import BasicInformation from './BasicInformation/BasicInformation'
import CoursePlanner from './CoursePlanner'

// Icons
import { IoClose } from 'react-icons/io5';

// Icon Settings
import SettingComponent from './Setting/SettingComponent';
import CoursePlannerHeader from './CoursePlannerHeader';


const PlannerComponent = () => {
    const [popUpStat, setPopUpStat] = useState(false)
    const [moduleData, setModuleData] = useState({moduleName: ""})
    

    const initialState = [
        { name: 'Pre-class', data: [] },
        { name: 'In-class', data: [] },
        { name: 'Post-class', data: []}
    ]

    // handle data
    const [leftActivities, setLeftActivities] = useState([])
    const [rightActivities, setRightActivities] = useState(initialState)

    // handle state
    const [activeSection, setActiveSection] = useState(1)
    const [activityWindow, setActivityWindow] = useState(false)
    const [activityType, setActivityType] = useState('add')
    const [editedItm, setEditedItm] = useState('')


    // fetch action
    const {accessToken} = useSelector(state => state.auth.token)
    const {course} = useSelector(state => state.course)
    const {module} = useSelector(state => state.module)

    const dispatch = useDispatch();

    const {page, id, subPage, subId} = useParams();
    const navigate = useNavigate();



    useEffect(() => {
        dispatch(getCourse({id: id, token: accessToken}))
    }, [accessToken, dispatch, id])

    useEffect(() => {
        dispatch(getModules({id: id, token: accessToken}))
    }, [accessToken, dispatch, id])
    
    
    

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

    const handleClosePopUp = (e) => {
        setModuleData({moduleName: ""})
        setPopUpStat(prevState => !prevState)
    }



    // functions
    const deleteRightCard = (boardName, id) => {
        const updatedRightActivities = rightActivities.map((board) => {
            if (board.name === boardName) {
              const updatedData = board.data.filter((activity) => activity.id !== id);
              return {
                ...board,
                data: updatedData,
              };
            }
            return board;
        });
      
        setRightActivities(updatedRightActivities);

    }

    const configMap = [
        {
            // header: 'Module Info', component: <BasicInformation data={module}/>
        }, 
        {
            header: 'Module Planning', 
            component: <CoursePlanner rightActivities={rightActivities} setRightActivities={setRightActivities}
                        activityType={activityType}
                        setActivityType={setActivityType}
                        setActivityWindow={setActivityWindow}
                        setEditedItm={setEditedItm}
                        setDeleteItm={deleteRightCard}
                        // setTabName={setTabName}
                        />
        },
        {
            header: "Settings", component: <SettingComponent />
        },
    ]

    const openAddEditDialog = () => {
        setActivityWindow((state) => !state)
        if (activityType !== 'add') {
            setActivityType('add')
        }
    }

    const [activeTabs, setActiveTabs] = useState('Pre-class')

    const filteredBoards = rightActivities.filter((board) => board.name === activeTabs);


    const handleEditedData = leftActivities.find((item) => item.id === editedItm) ? leftActivities.find((item) => item.id === editedItm)
    : (rightActivities.find((board) => board.name === activeTabs) || { data: [] }).data.find((activity) => activity.id === editedItm)
        

    const deleteLeftCard = (id) => {
        setLeftActivities(leftActivities.filter((item) => item.id !== id))
    }
    

    const insertItemAtIndex = (array, item, index) => {
        const newArray = [...array];
        newArray.splice(index, 0, item);
        return newArray;
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
    
        const { source, destination } = result;
    
        // If the item is dragged from the left board to the right board
        if (source.droppableId === 'left_board' && destination.droppableId !== 'left_board') {
          // Handle the logic when an item is dragged from the left board to the right board
            const draggedItem = leftActivities[source.index];
        
            const updatedRightActivities = rightActivities.map((board) => {
                if (board.name === destination.droppableId) {
                  return {
                    ...board,
                    data: insertItemAtIndex(board.data, draggedItem, destination.index),
                  };
                }
                return board;
              });
        
            setRightActivities(updatedRightActivities);
        
            // Remove the dragged item from the leftActivities array
            setLeftActivities((prevLeftActivities) =>
                prevLeftActivities.filter((item, index) => index !== source.index)
            );


        }
    
        // If the item is dragged within the left board
        if (source.droppableId === 'left_board' && destination.droppableId === 'left_board') {
          // Handle the logic when an item is reordered within the left board
          const updatedLeftActivities = Array.from(leftActivities);
          const [draggedItem] = updatedLeftActivities.splice(source.index, 1);
          updatedLeftActivities.splice(destination.index, 0, draggedItem);
    
          setLeftActivities(updatedLeftActivities);
        }
    
        // If the item is dragged within the right board
        if (source.droppableId !== 'left_board' && destination.droppableId === source.droppableId) {
          // Handle the logic when an item is dragged within the right board
          const updatedRightActivities = rightActivities.map((board) => {
            if (board.name === source.droppableId) {
              const updatedData = Array.from(board.data);
              const [draggedItem] = updatedData.splice(source.index, 1);
              updatedData.splice(destination.index, 0, draggedItem);
    
              return {
                ...board,
                data: updatedData,
              };
            }
            return board;
          });
    
          setRightActivities(updatedRightActivities);
        }
    
        // If the item is dragged from the right board to the left board
        if (source.droppableId !== 'left_board' && destination.droppableId === 'left_board') {
          // Handle the logic when an item is dragged from the right board to the left board
          const draggedItem = rightActivities
            .find((board) => board.name === source.droppableId)
            .data[source.index];
    
          const updatedRightActivities = rightActivities.map((board) => {
            if (board.name === source.droppableId) {
              const updatedData = Array.from(board.data);
              updatedData.splice(source.index, 1);
    
              return {
                ...board,
                data: updatedData,
              };
            }
            return board;
          });
    
          setRightActivities(updatedRightActivities);
    
          // Add the dragged item back to the leftActivities array
          setLeftActivities((prevLeftActivities) => [...prevLeftActivities.slice(0, destination.index), draggedItem, ...prevLeftActivities.slice(destination.index)]);
        }
    
        // If the item is dragged within the right board and the source and destination boards are the same
        if (
          source.droppableId !== 'left_board' &&
          destination.droppableId !== 'left_board' &&
          source.droppableId === destination.droppableId
        ) {
          // Handle the logic when an item is reordered within the right board
          const updatedRightActivities = rightActivities.map((board) => {
            if (board.name === source.droppableId) {
              const updatedData = Array.from(board.data);
              const [draggedItem] = updatedData.splice(source.index, 1);
              updatedData.splice(destination.index, 0, draggedItem);
    
              return {
                ...board,
                data: updatedData,
              };
            }
            return board;
          });
    
          setRightActivities(updatedRightActivities);
        }
    };

    const handleGoBackToCoursePage = () => {
        navigate(`/${page}/${id}/modules`)
    }

    const handlePreviewData = () => {
        navigate(`/down-preview`)
    }

    const ActivityHeaderFunction = { setActiveSection, handleGoBackToCoursePage, handlePreviewData }
    const ActivityHeaderData = { configMap, activeSection }

    const ActivityPlanningFunction = {dispatch, 
        setPopUpStat, 
        openAddEditDialog, 
        setActivityType, 
        setActivityWindow, 
        setEditedItm, 
        deleteLeftCard, 
        setActiveTabs, 
        deleteRightCard
    }
    const ActivityPlanningData = {id, leftActivities, rightActivities, activityType, activeTabs, filteredBoards}

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="course_planner_wrapper">
                <CoursePlannerHeader activityData={ActivityHeaderData} activityFunction={ActivityHeaderFunction} />

                <div className="planner_container">
                    {activeSection === 1 &&
                        <CoursePlanner activityData={ActivityPlanningData} activityFunction={ActivityPlanningFunction}/>
                    }

                    {
                        activeSection === 2 && <SettingComponent />
                    }
                    
                </div>

                {
                    activityWindow === true 
                    && 
                    <ActivityWindow 
                        type={activityType}
                        leftActivities={leftActivities}
                        setLeftActivities={setLeftActivities}
                        rightActivities={rightActivities}
                        setRightActivities={setRightActivities}
                        setActivityWindow={setActivityWindow}
                        editedData={handleEditedData}
                        tabName={activeTabs}
                    />
                }

                <div className={`course_planner_popup_form ${popUpStat === true ? 'active' : ''}`}>
                    <div className="overlay"></div>
                    <div className="form_content">
                    <form onSubmit={handleSubmitForm}>
                        <div className="form_header mb-4">
                            <div className=" d-flex justify-content-between">
                                <p>Add Module</p>
                                <span style={{cursor: 'pointer'}}><IoClose onClick={handleClosePopUp}/></span>
                            </div>
                            <hr/>
                        </div>

                        <div className="mb-4">
                            <input type="text" className="form-control" 
                                id="inputModuleName" 
                                aria-describedby="inputModuleName" 
                                name="moduleName" 
                                value={moduleData.moduleName}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className="form_bottom d-flex justify-content-end">
                            <span className="btn" onClick={handleClosePopUp}>Cancel</span>
                            <button className="btn btn-outline-primary ms-2">Add Module</button>
                        </div>
                    </form>
                    </div>
                    
                </div>
            </div>
        </DragDropContext>
    )
}

export default PlannerComponent