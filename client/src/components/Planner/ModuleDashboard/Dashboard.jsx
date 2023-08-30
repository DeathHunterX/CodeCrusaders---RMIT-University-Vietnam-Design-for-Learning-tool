import { Fragment } from "react"
import ModuleCard from "./Card"

import DoughnutChart from "./DoughnutChart"

const ModuleDashboard = ({compData, compFunction}) => {
  const {width2, activitiesData} = compData;
  const {setActivitiesData} = compFunction;


  return (
    <div className="module_dashboard" style={{width: `${width2}%`, overflow: "hidden"}}>
      <div className="d-flex module-cards ">
        {
          activitiesData?.map((session) => {
            const calculateDuration = session?.activityList.reduce((total, activity) => total + activity.duration, 0);
            return (
              <Fragment key={session.id}>
                <ModuleCard title={session.sessionName.replace(/_/g, ' ')} 
                sessionID={session.id}
                number={session?.activityList?.length}
                numberDuration={calculateDuration} 
                totalDuration={session.totalDuration} 
                setActivitiesData={setActivitiesData}/>
              </Fragment>
          )})
        }
      </div>

      <div className="d-flex module-pie">
        {
          activitiesData?.map((session) => (
            <div className="module-pie-detail" key={session.id}>
              <DoughnutChart dataset={session.activityList} durationTime={session.totalDuration}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ModuleDashboard