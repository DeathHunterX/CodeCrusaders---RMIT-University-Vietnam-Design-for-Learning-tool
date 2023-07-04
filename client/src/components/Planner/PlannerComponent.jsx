import React, { useState } from 'react'
import BasicInformation from './BasicInformation/BasicInformation'
import CoursePlanner from './CoursePlanner'

// import { ActivityCardList } from './Activity/Map/ActivityCardList'

import ActivityCard from './Activity/Card/ActivityCard'
import ActivityWindow from './Activity/ActivityWindow/ActivityWindow'


const PlannerComponent = () => {
    const [leftActivities, setLeftActivities] = useState([])

    const [activeSection, setActiveSection] = useState(0)
    const [activityWindow, setActivityWindow] = useState(false)

    const configMap = [
        {header: 'Module Info', component: <BasicInformation/>}, 
        {header: 'Module Planner', component: <CoursePlanner/>}, 
        {header: 'Open Module', component: ''},
        {header: 'Return to Previous', component: ''}
    ]

    return (
        <div className="planner_component">
            {
                activityWindow === true 
                && 
                <ActivityWindow isCreated={true} 
                activityWindow={activityWindow}
                setActivityWindow={setActivityWindow}
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
                            <div className="activity_container">
                                <div className="">
                                    <button className="btn btn-outline-info w-100" onClick={() => setActivityWindow(!activityWindow)}>
                                        Add Activity
                                    </button>
                                </div>

                                <div className="activity_section" style={{maxHeight: "85vh", height: "100%"}}>
                                    <div className="activity_wrapper">
                                        <div className="activity_wrapper_inner">
                                            
                                            <ul style={{paddingLeft: '0'}}>
                                                {leftActivities.map((activity_itm, idx) => (      
                                                    <ActivityCard 
                                                    key={activity_itm.activityID}
                                                    id={activity_itm.activityID}
                                                    index={idx}
                                                    data={activity_itm}
                                                    // moveCard={moveCard}
                                                    />    
                                                ))}
                                                
                                            </ul>
                                        </div>        
                                            
                                    </div>
                                </div> 
                            </div>
                        )
                    }
                    
                </div>
                <div className="planner_right_side tabs_right">
                    {configMap[activeSection].component}
                    {/* <CoursePlanner/> */}

                </div>
            </div>
        </div>
    )
}

export default PlannerComponent