import React, { useState, useEffect } from 'react'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { useDrag} from 'react-dnd';
import { ItemTypes } from '../ItemTypes';

const ActivityCard = ({id, index, data, moveCard}) => {
    const [itemStats, setItemStats] = useState({x: 0, y: 0, width: 0, height: 0});

    const [{ isDragging }, drag, preview] = useDrag({
        type: ItemTypes.ACTIVITY, 
        item: {
            id: id, 
            index: index, 
            data: data, 
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
    
    
    return (
        <li ref={drag}
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