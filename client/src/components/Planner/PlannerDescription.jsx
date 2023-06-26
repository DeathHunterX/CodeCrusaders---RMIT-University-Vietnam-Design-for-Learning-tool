import React, {useRef, useState} from 'react'
import {useDrop} from 'react-dnd'

import ResizableBox from '../ResizableBox/ResizableBox'

import { ItemTypes } from './Activity/ItemTypes'
import { ModuleMap } from './ModuleMap'
import ActivityCard02 from './Activity/Card/ActivityCard02'

const PlannerDescription = () => {
  const [rightActivities, setRightActivities] = useState([])
  const ref = useRef(null)

  const [{isOver}, drop] = useDrop(() => ({
    accept: ItemTypes.ACTIVITY,
    hover: (item, monitor) => {
      if(!ref.current) return

      const dragIndex = item.index
    },
    drop: (item) => addActivity(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    })
  }))

  const addActivity = (id) => {
    const activityList = ModuleMap.filter((activity) => id === activity.activityID)
    console.log(activityList)
    setRightActivities((list) => [...list, activityList[0]])
    
  }

  const moveCard = () => {

  }
  return (
    <div className="right_board d-flex">
      <div className="col-5 d-flex" ref={drop}>
        <div className="activity_board_container">
          <div className="activity_board_inner_container">
            <ul className="activity_time_list" style={{paddingLeft: '0'}}>
              <li style={{height: '100px', position: 'relative', top: 0}}>00:00</li>
              <li style={{height: '150px', position: 'relative', top: '-30px'}}>
                00:10
                <div style={{borderTop: "1px dashed rgb(204, 204, 204)", width: "74px", position: "absolute"}}></div>
              </li>
            </ul>
            <ul className="activity_list" style={{paddingLeft: '0'}}>
                {rightActivities.map((activity_itm, idx) => (
                    <ActivityCard02 
                      key={activity_itm.activityID}
                      id={activity_itm.activityID}
                      index={idx}
                      data={activity_itm}
                      moveCard={moveCard}
                    />
                ))}
            </ul>
          </div>
        </div>
        
      </div>
      <div className="col-3"></div>
      <div className="col-4">
        <ResizableBox/>
      </div>
    </div>
  )
}

export default PlannerDescription