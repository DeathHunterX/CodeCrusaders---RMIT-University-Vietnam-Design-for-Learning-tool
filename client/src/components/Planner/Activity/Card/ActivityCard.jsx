import React, { useState, useEffect, useRef } from 'react'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { useDrag} from 'react-dnd';
import { ActivityTypes } from '../ActivityTypes';

const ActivityCard = ({id, index, data, moveCard}) => {
    const [itemStats, setItemStats] = useState({x: 0, y: 0, width: 0, height: 0});
    const ref = useRef(null)
    const [{ isDragging }, drag, preview] = useDrag({
        type: ActivityTypes.ACTIVITY, 
        item: {
            activityID: id, 
            index: index,  
            itemStats: itemStats
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: true})
    }, [preview])

    const handleDragStart = (event) => {
        // Get the initial position of the element
        const rect = event.target.getBoundingClientRect();
        setItemStats({x: rect.left, y: rect.top, width: rect.width, height: rect.height})
    };
    
    drag(ref)
    
    return (
        <li ref={ref}
            style={{cursor: 'grab', opacity: isDragging ? 0.5 : 1 }} 
            onDragStart={handleDragStart}
        > 
            <div className="class_activity" style={{height: '100px', position:'relative'}}>
                <div className="activity_card mb-3" style={{userSelect: 'none'}}>
                    <div className="activity_symbols" style={{backgroundColor: `${data.activityIconBg}`}}>
                        {data.activityIcon}
                    </div>
                    <div className="activity_content">
                        <div className="content_body">
                            <h5 className="activity_name">{data.activityName}</h5>
                            <p className="activity_desc">{data.activityDescription}</p>     
                        </div>
                    </div>
                </div>
                
            </div>
        </li>
    )
}

export default ActivityCard