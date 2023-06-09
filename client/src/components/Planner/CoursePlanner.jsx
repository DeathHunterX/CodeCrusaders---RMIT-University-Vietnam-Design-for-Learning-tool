import React, { useState } from 'react'
import PlannerDescription from './ModulePlanner/PlannerDescription'

const CoursePlanner = ({items, onDragEnd}) => {
  const [activeTabs, setActiveTabs] = useState(0)

  const configMap = [
    {header: 'Pre-class', component: <PlannerDescription/>}, 
    {header: 'In-class', component: <PlannerDescription/>}, 
    {header: 'Post-class', component: <PlannerDescription/>}
  ]
  return (
    <div className="module_planner">

      <div className="tabs_container">
        <div className="tabs_header">
          {
            configMap.map((entry,idx) => (
              <div
                className={`tabs ${activeTabs === idx ? "active_tabs" : ""}`}
                onClick={() => setActiveTabs(idx)} key={idx}
              >
                {entry.header}
              </div>
            ))
          }
        </div>

        <div className="tabs_body">
          {configMap[activeTabs].component}
        </div>
      </div>
  
    </div>
  )
}

export default CoursePlanner