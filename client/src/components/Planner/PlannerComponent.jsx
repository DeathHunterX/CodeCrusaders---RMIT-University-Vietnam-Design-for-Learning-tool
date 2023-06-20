import React, {useState} from 'react'

import CoursePlanner from './CoursePlanner'
import { ModuleMap } from './ModuleMap'
import ActivityCard from './Activity/Card/ActivityCard'

import CustomDragCardLayer from '../DragAndDrop/CustomDragCardLayer'


const PlannerComponent = () => {
    // const [section, setSection] = useState('course-planner')

    const [leftActivities, setLeftActivities] = useState(ModuleMap)
    const moveCard = () => {

    }
    

    
    return (
            <div className="planner_component">
                
                <div className="planner_left_side d-flex">
                    <div className=""></div>

                    <div className="activity_section">
                        <div className="activity_wrapper">
                            <div className="activity_wrapper_inner">
                                <div className="">
                                    <div className="activity_dnd" > 
                                        <ul style={{paddingLeft: '0'}}>
                                            {leftActivities.map((activity_itm, idx) => (      
                                                <ActivityCard 
                                                key={activity_itm.activityID}
                                                id={activity_itm.activityID}
                                                index={idx}
                                                data={activity_itm}
                                                moveCard={moveCard}
                                                />    
                                            ))}
                                            
                                        </ul>
                                        <CustomDragCardLayer />
                                    </div>        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="planner_right_side">
                        <CoursePlanner/>
                </div>
            </div>
  )
}

export default PlannerComponent