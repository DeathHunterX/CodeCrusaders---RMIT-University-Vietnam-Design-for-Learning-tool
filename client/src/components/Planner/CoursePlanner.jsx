import React, { useEffect, useState } from 'react'
import PlannerDescription from './ModulePlanner/PlannerDescription'

const CoursePlanner = ({rightActivities, activityType, setActivityType, setActivityWindow, setEditedItm, setDeleteItm, setTabName}) => {
  const [activeTabs, setActiveTabs] = useState('Pre-class')

  const filteredBoards = rightActivities.filter((board) => board.name === activeTabs);

  useEffect(() => {
    setTabName(activeTabs)
  }, [activeTabs, setTabName])
  return (
    <div className="module_planner">

      <div className="tabs_container">
        <div className="tabs_header">
          {
            rightActivities.map((entry,idx) => (
              <div
                className={`tabs ${activeTabs === entry.name ? "active_tabs" : ""}`}
                onClick={() => setActiveTabs(entry.name)} key={idx}
              >
                {entry.name}
              </div>
            ))
          }
        </div>

        <div className="tabs_body">
          {filteredBoards.map((board, idx) => (
            <PlannerDescription data={board} key={idx}
              tabName={activeTabs}
              rightActivities={rightActivities}
              activityType={activityType}
              setActivityType={setActivityType}
              setActivityWindow={setActivityWindow}
              setEditedItm={setEditedItm}
              setDeleteItm={setDeleteItm}
            />
          ))}
        </div>
      </div>
  
    </div>
  )
}

export default CoursePlanner