import React, { useEffect, useState } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'

import ActivityCard from '../Activity/Card/ActivityCard'


const Board = ({compData, compFunction}) => {
    const {item, activitiesData} = compData;
    const {openAddEditDialog, setEditedItm, deleteCardInBoard} = compFunction;

    const [timeline, setTimeline] = useState([])

    const getDataLength = (activitiesData.find((board) => board.sessionName === item.sessionName) || { data: [] }).activityList.length

    //handle set timeline base on rightActivities length
    useEffect(() => {

        if (getDataLength > 0) {
        const getDataDuration = (activitiesData.find((board) => board.sessionName === item.sessionName) || { data: [] })
                                .activityList.map((activity) => parseInt(activity.duration, 10))
                                .filter((duration) => !isNaN(duration));


        const timelineHandle = getDataDuration.reduce((acc, duration, index) => {
            const lastTime = index === 0 ? '00:00' : acc[index - 1];
            const [hours, minutes] = lastTime.split(':').map(Number);
        
            const newMinutes = minutes + duration;
            const newHours = hours + Math.floor(newMinutes / 60);
            const formattedTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes % 60).padStart(2, '0')}`;
        
            return [...acc, formattedTime];
        }, []);
        
        setTimeline(['00:00', ...timelineHandle])
        } else {
        setTimeline([])
        }
            
    }, [activitiesData, getDataLength, item.sessionName])
    return (
        
                
        <div className="activity_list_body">
            <div className="d-flex">
                <ul className="activity_time_list" style={{paddingLeft: '0', textAlign: 'center'}}>
                    {timeline &&
                        <>
                        <li style={{height: '100px', position: 'relative', top: 0}}>{timeline[0]}</li>
                        {(timeline.slice(1)).map((time, idx) =>(
                            <li style={{height: '100px', position: 'relative', top: '-30px'}} key={idx}>
                            {time}
                            <div style={{borderTop: "1px dashed rgb(204, 204, 204)", width: "74px", position: "absolute"}}></div>
                            </li>
                        ))}
                        </>
                    }
                </ul>
                <Droppable droppableId={`${item.sessionName}`}>
                    {(provided) => (
                        <ul className="activity_list_cards w-100" style={{padding: '10px 0'}}
                        ref={provided.innerRef} 
                            {...provided.droppableProps}
                        >
                            {item.activityList.map((activity_itm, idx) => {
                                return(   

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
                                                board={item.sessionName}
                                                isEditable={true}
                                                openAddEditDialog={openAddEditDialog}
                                                setEditedItm={setEditedItm}
                                                setDeleteItm={deleteCardInBoard}
                                            />
                                        </div>

                                    )}
                                        
                                </Draggable>
                                
                            )})}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>    
            </div>                        
        </div> 

    )
}

export default Board