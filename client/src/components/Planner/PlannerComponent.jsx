import React, {useState} from 'react'

import CoursePlanner from './CoursePlanner'

import { ActivityMap } from './ActivityMap'

// Replace with react-beautiful-dnd due to not supported in StrictMode from React 18.0 or above
import {DragDropContext, Droppable, Draggable} from '@hello-pangea/dnd' 


const PlannerComponent = () => {
    // const [section, setSection] = useState('course-planner')

    const [leftActivities, setLeftActivities] = useState(ActivityMap)
    const [rightActivities, setRightActivities] = useState([])

    const [rightCount, setRightCount] = useState(0)

    const [hoverRect, setHoverRect] = useState(null);

    function handleDragEnd(result){
        // console.log(result)
        
        if (!result.destination) return;

        const { source, destination } = result;

        // Check if the item was dropped within the bounds of the right board
        if (destination && destination.droppableId === 'right_board') {
            const item = leftActivities.find((item) => item.activityID === result.draggableId);
            const clonedItem = { ...item, activityID: `item-${rightCount}` };


            console.log(clonedItem)

            // Add the cloned item to the right board
            setRightActivities([...rightActivities, clonedItem])      
            setRightCount(rightCount + 1)

        }

    }

    const onDragUpdate = (snapshot) => {
        console.log(snapshot)
        const { draggingOver, draggingOverWith } = snapshot;
    
        // if (!draggingOver) {
        //     setHoverRect(null);
        //     return;
        // }
    
        // const droppableElement = document.getElementById(draggingOver);
        // const draggableElement = document.getElementById(draggingOverWith);
    
        // const droppableRect = droppableElement.getBoundingClientRect();
        // const draggableRect = draggableElement.getBoundingClientRect();
    
        // const hoverRect = {
        //     top: droppableRect.top,
        //     left: droppableRect.left,
        //     width: droppableRect.width,
        //     height: draggableRect.height,
        // };
    
        // setHoverRect(hoverRect);
    };
    
    const renderHoverRect = (hoverRect) => {
        const { top, left, width, height } = hoverRect;

        return (
            <div
            style={{
                position: "fixed",
                top: `${top}px`,
                left: `${left}px`,
                width: `${width}px`,
                height: `${height}px`,
                background: "rgba(0, 0, 0, 0.1)",
                zIndex: 999,
            }}
            />
        );
    };
    
    return (
        <div className="planner_component">
            <DragDropContext 
            // onDragStart={}
            // onDragUpdate={}
            onDragEnd={handleDragEnd}
            >
                <div className="planner_left_side d-flex">
                    <div className=""></div>

                    <div className="activity_section">
                        <div className="activity_wrapper">
                            <div className="activity_wrapper_inner">
                                <div className="">
                                    <div className="activity_dnd" >

                                        <Droppable droppableId='left_board' isDropDisabled={true}>
                                            {(provided) => (
                                                <ul {...provided.droppableProps} ref={provided.innerRef} 
                                                style={{listStyle: 'none', paddingLeft: '0'}}
                                                >
                                                    {leftActivities.map((activity_itm, idx) => (
                                                        <Draggable key={activity_itm.activityID} 
                                                        draggableId={activity_itm.activityID} 
                                                        index={idx}

                                                        >
                                                            {(provided, snapshot) => (
                                                                <li {...provided.draggableProps} {...provided.dragHandleProps}  ref={provided.innerRef}
                                                                onMouseMove={onDragUpdate(snapshot)}
                                                                >
                                                                    {/* <div className="activity_dnd_item" key={idx}> */}
                                                                    <div className="class_activity" style={{height: '100px'}}>

                                                                        <div className="activity_card mb-3">
                                                                            <div className="activity_symbols" style={{backgroundColor: `${activity_itm.activityIconBg}`}}>
                                                                                {activity_itm.activityIcon}
                                                                            </div>
                                                                            <div className="activity_content">
                                                                                <div className="content_body">
                                                                                    <h5 className="activity_name">{activity_itm.activityName}</h5>
                                                                                    <p className="activity_desc">{activity_itm.activityDescription}</p>     
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    {/* </div> */}
                                                                </li>
                                                            )}
                                                            
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                    {hoverRect && renderHoverRect(hoverRect)}
                                                </ul>
                                            )}
                                        </Droppable>
                                    </div>        


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="planner_right_side">
                    <CoursePlanner items={rightActivities} onDragEnd={handleDragEnd}/>
                </div>
            </DragDropContext>
        </div>
  )
}

export default PlannerComponent