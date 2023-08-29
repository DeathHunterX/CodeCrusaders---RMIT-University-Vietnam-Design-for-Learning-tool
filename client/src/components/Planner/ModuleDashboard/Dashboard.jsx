import { Fragment } from "react"
import ModuleCard from "./Card"

import {useSelector} from "react-redux"
import DoughnutChart from "./DoughnutChart"

const ModuleDashboard = ({width}) => {
  const {sessions} = useSelector(state => state.session)


  return (
    <div className="module_dashboard" style={{width: `${width}%`, overflow: "hidden"}}>
      <div className="d-flex moudule-cards ">
        {
          sessions?.map((session) => {
            const calculateDuration = session?.activityList.reduce((total, activity) => total + activity.duration, 0);
            return (
              <Fragment key={session.id}>
                <ModuleCard title={session.sessionName} 
                number={session?.activityList?.length}
                numberDuration={calculateDuration} 
                totalDuration={session.totalDuration} />
              </Fragment>
          )})
        }
      </div>

      <div className="d-flex module-pie">
        {
          sessions?.map((session) => (
            <div className="module-pie-detail">
              <DoughnutChart dataset={session.activityList} durationTime={session.totalDuration} key={session.id}/>
            </div>
          ))
        }
        
        {/* <div className="module-pie-detail">
          <ModulePieChart data={data} />
        </div>
        <div className="module-pie-detail">
          <ModulePieChart data={data} />
        </div> */}
      </div>
    </div>
  )
}

export default ModuleDashboard