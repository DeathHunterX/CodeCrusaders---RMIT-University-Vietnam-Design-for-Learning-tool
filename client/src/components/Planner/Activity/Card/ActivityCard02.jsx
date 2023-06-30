import React, { useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ActivityTypes } from '../ActivityTypes';

import {RiDeleteBin5Fill} from 'react-icons/ri'
import { ActivityCardList } from '../Map/ActivityCardList';

const ActivityCard02 = ({id, index, itemId, moveCard, createCardByIdx}) => {
    const [itemStats, setItemStats] = useState({x: 0, y: 0, width: 0, height: 0});
    const ref = useRef(null)

    const [, drop] = useDrop({
        accept: ActivityTypes.ACTIVITY,
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // console.log('dragIndex: ' + dragIndex)
            // console.log('hoverIndex: ' + hoverIndex)

            if (dragIndex === hoverIndex) {
                return
            }

            const hoveredRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            
            if (!item.itemID) {
                // console.log({dragIndex, hoverIndex, item})
                // createCardByIdx(hoverIndex, item)
                
            } else {
                moveCard(dragIndex, hoverIndex);
                item.index = hoverIndex;
            }
            
            
        },
        
    });

    const [{ isDragging }, drag, preview] = useDrag({
        type: ActivityTypes.ACTIVITY, 
        item: {
            activityID: id,
            itemID: itemId,
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
    
    // const [show, setShow] = useState(false);

    // const onOpen = () => setShow(true);
    // const onClose = () => setShow(false);
    const filter = ActivityCardList.filter((activity) => id === activity.activityID)
    drag(drop(ref))
    
    return (
        <li 
        ref={ref}
            style={{cursor: 'grab', opacity: isDragging ? 0.5 : 1 }} 
            onDragStart={handleDragStart}
        > 
            <div className="class_activity" style={{height: '100px', position:'relative'}}>
                <div className="activity_card mb-3" style={{userSelect: 'none', boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}}>
                    <div className="activity_symbols" style={{backgroundColor: `${filter[0].activityIconBg}`}}>
                        {filter[0].activityIcon}
                    </div>
                    <div className="activity_content">
                        <div className="content_body">
                            <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <h5 className="activity_name">{filter[0].activityName}</h5>
                                <small className="ms-3">(Click here to edit)</small>
                            </div>
                            <div className="">
                                <RiDeleteBin5Fill />
                            </div>
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