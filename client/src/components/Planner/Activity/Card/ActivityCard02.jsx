import React, { useEffect, useRef, useState } from 'react'
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ItemTypes } from '../ItemTypes';

import {RiDeleteBin5Fill} from 'react-icons/ri'

const ActivityCard02 = ({id, index, data, moveCard}) => {
  const [itemStats, setItemStats] = useState({x: 0, y: 0, width: 0, height: 0});
  const ref = useRef(null)

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
  
  const [show, setShow] = useState(false);

  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);
  
  return (
    <li ref={ref}
        style={{cursor: 'grab', opacity: isDragging ? 0.5 : 1 }} 
        onDragStart={handleDragStart}
    > 
        <div className="class_activity" style={{height: '100px', position:'relative'}}>
            <div className="activity_card mb-3" style={{userSelect: 'none', boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}}>
                <div className="activity_symbols" style={{backgroundColor: `${data.activityIconBg}`}}>
                    {data.activityIcon}
                </div>
                <div className="activity_content">
                    <div className="content_body">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex">
                            <h5 className="activity_name">{data.activityName}</h5>
                            <small className="ms-3">(Click here to edit)</small>
                          </div>
                          <RiDeleteBin5Fill />
                        </div>
                        {/* <p className="activity_desc">{data.activityDescription}</p>      */}
                    </div>
                </div>
            </div>
            
        </div>
    </li>
  )
}

export default ActivityCard02