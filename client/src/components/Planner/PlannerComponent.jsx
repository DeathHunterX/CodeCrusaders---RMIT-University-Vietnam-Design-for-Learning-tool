import React, { useState } from 'react'

import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd'

import BasicInformation from './BasicInformation/BasicInformation'
import CoursePlanner from './CoursePlanner'

import ActivityCard from './Activity/Card/ActivityCard'
import ActivityWindow from './Activity/ActivityWindow/ActivityWindow'


const PlannerComponent = () => {
    const initialState = [
        { name: 'Pre-class', data: [] },
        { name: 'In-class', data: [] },
        { name: 'Post-class', data: []}
    ]

    const [leftActivities, setLeftActivities] = useState([])
    const [rightActivities, setRightActivities] = useState(initialState)

    const [activeSection, setActiveSection] = useState(1)
    const [activityWindow, setActivityWindow] = useState(false)
    const [activityType, setActivityType] = useState('add')
    const [editedItm, setEditedItm] = useState('')
    
    const [tabName, setTabName] = useState('')

    const openAddEditDialog = () => {
        setActivityWindow((state) => !state)
        if (activityType !== 'add') {
            setActivityType('add')
        }
    }

    const handleEditedData = leftActivities.find((item) => item.id === editedItm) ? leftActivities.find((item) => item.id === editedItm)
    : (rightActivities.find((board) => board.name === tabName) || { data: [] }).data.find((activity) => activity.id === editedItm)
        

    const deleteLeftCard = (id) => {
        setLeftActivities(leftActivities.filter((item) => item.id !== id))
    }

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
            header: 'Module Info', component: <BasicInformation/>
        }, 
        {
            header: 'Module Planner', 
            component: <CoursePlanner rightActivities={rightActivities} setRightActivities={setRightActivities}
                        activityType={activityType}
                        setActivityType={setActivityType}
                        setActivityWindow={setActivityWindow}
                        setEditedItm={setEditedItm}
                        setDeleteItm={deleteRightCard}
                        setTabName={setTabName}
                        />
        }, 
        {header: 'Open Module', component: ''},
        {header: 'Return to Previous', component: ''}
    ]

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
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="planner_component">
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
                        tabName={tabName}
                    />
                }
                <div className="vertical_tabs_container">
                    <div className="planner_left_side d-flex">
                        <div className="tabs_left">
                            {
                                configMap.map((entry,idx) => (
                                    <div
                                        className={`tabs ${activeSection === idx ? "active_tabs" : ""}`}
                                        onClick={() => setActiveSection(idx)} key={idx}
                                    >
                                        {entry.header}
                                    </div>
                                ))
                            }
                        </div>
                        {
                            activeSection === 1 &&
                            (

                                <div className="activity_container" style={{padding: "0 5px"}}>
                                    <div className="">
                                        <button className="btn btn-outline-info w-100" 
                                        onClick={() => openAddEditDialog()}
                                        >
                                            Add Activity
                                        </button>
                                    </div>

                                    <div className="activity_section" style={{maxHeight: "83vh", height: "100%", border: "1px solid darkgray"}}>
                                        <div className="activity_wrapper">
                                            <div className="activity_wrapper_inner">
                                                <Droppable droppableId='left_board'>
                                                    {(provided) => (
                                                        <ul style={{paddingLeft: '0'}}
                                                        ref={provided.innerRef} 
                                                        {...provided.droppableProps}
                                                        >
                                                            {leftActivities.map((activity_itm, idx) => (   
        
                                                                <Draggable key={activity_itm.id} draggableId={activity_itm.id} index={idx}>
                                                                    {(provided, snapshot) => (
                                                                        <div ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            ...provided.draggableProps.style,
                                                                            opacity: snapshot.isDragging ? '0.5' : '1'
                                                                        }}
                                                                        >
                                                                            <ActivityCard
                                                                                data={activity_itm}
                                                                                isEditable={true}
                                                                                activityType={activityType}
                                                                                setActivityType={setActivityType}
                                                                                setActivityWindow={setActivityWindow}
                                                                                setEditedItm={setEditedItm}
                                                                                setDeleteItm={deleteLeftCard}
                                                                            />
                                                                        </div>

                                                                    )}
                                                                        
                                                                </Draggable>
                                                                
                                                            ))}
                                                            {provided.placeholder}
                                                        </ul>
                                                    )}
                                                </Droppable>
                                            </div>        
                                                
                                        </div>
                                    </div> 
                                </div>
                            )
                        }
                        
                    </div>
                    <div className="planner_right_side tabs_right">
                        {configMap[activeSection].component}
                    </div>
                </div>
            </div>
        </DragDropContext>
    )
}

export default PlannerComponent