import React, {useRef, useState} from 'react'
import {useDrop} from 'react-dnd'

// import ResizableBox from '../ResizableBox/ResizableBox'

import { ActivityTypes } from './Activity/ActivityTypes'
// import { ActivityCardList } from './Activity/Map/ActivityCardList'

import ActivityCard02 from './Activity/Card/ActivityCard02'
import DoughnutChart from './DoughnutChart'

const PlannerDescription = () => {
  const [rightActivities, setRightActivities] = useState([])

  const dropRef = useRef()


  const [{canDrop, isOver}, drop] = useDrop(() => ({
    accept: ActivityTypes.ACTIVITY,
    hover(item, monitor) {
      if (!dropRef.current) {
        return
      }
    },
    drop: (item, monitor) => {
      // if (rightActivities.length >= 1) {
      //   const newItems = [...rightActivities]
        
      // } else {
        if (item.itemID) {return}
        const updatedItem = {...item, itemID: `item-${rightActivities.length + 1}`}
        setRightActivities((prevItm) => prevItm.concat(updatedItem))  
      // }
      
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    })
  }), [rightActivities])

  const moveCard = (dragIndex, hoverIndex) => {
    console.log(dragIndex)
    const draggedItem = rightActivities[dragIndex];
    setRightActivities(prevState => {
        const newItems = prevState.filter((i, idx) => idx !== dragIndex);
        newItems.splice(hoverIndex, 0, draggedItem);
        return  [ ...newItems ];
    });
  };

  drop(dropRef)
  return (
    <div className="right_board d-flex">
      <div className="col-5 d-flex">
        <div className="activity_board_container">
          <div className="activity_board_inner_container" ref={dropRef}>
            <ul className="activity_time_list" style={{paddingLeft: '0'}}>
              <li style={{height: '100px', position: 'relative', top: 0}}>00:00</li>
              <li style={{height: '150px', position: 'relative', top: '-30px'}}>
                00:10
                <div style={{borderTop: "1px dashed rgb(204, 204, 204)", width: "74px", position: "absolute"}}></div>
              </li>
            </ul>
            <ul className="activity_list" style={{paddingLeft: '0'}}>
                {rightActivities.map((activity_itm, idx) => ( 
                    <div key={activity_itm.itemID}>
                      <ActivityCard02 
                        id={activity_itm.activityID}
                        itemId={activity_itm.itemID}
                        index={idx}
                        moveCard={moveCard}
                      />
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="col-5">
        <div className="activity_review ps-3 pe-3">
          <h5>Review</h5>
          <span>Here's a quick review of the session plan you created</span>
        </div>
        <div className="chart">
          <DoughnutChart dataset={rightActivities}/>
        </div>
      </div>
    </div>
  )
}

export default PlannerDescription