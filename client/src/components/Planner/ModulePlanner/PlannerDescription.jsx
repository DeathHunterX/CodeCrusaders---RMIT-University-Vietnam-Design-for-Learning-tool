import React, {useRef, useState} from 'react'

import ActivityCard02 from '../Activity/Card/ActivityCard02'
import DoughnutChart from '../DoughnutChart'

import {IconSetting} from '../../../utils/IconSetting'
import { MdOutlineCheckCircleOutline, MdOutlineRemoveCircleOutline } from 'react-icons/md'

const PlannerDescription = () => {
  const [rightActivities, setRightActivities] = useState([])

  const [durationTime, setDurationTime] = useState(0)
  const [handleDuration, setHandleDuration] = useState(0)

  const handleSubmit = (e) => {
      e.preventDefault()
      setHandleDuration(durationTime)
  }

  return (
    <div className="right_board d-flex">
      <div className="col-5 d-flex">
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
                    <div key={activity_itm.itemID}>
                      <ActivityCard02 
                        id={activity_itm.activityID}
                        itemId={activity_itm.itemID}
                        index={idx}
                      />
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="col-7">
        <div className="review_container">
          <div className="review_header ps-3 pe-3">
            <h5>Review</h5>
            <span>Here's a quick review of the session plan you created</span>

            <form className="duration_input d-flex align-items-center mt-1" onSubmit={handleSubmit}>
                <span>Duration Time:</span>
                <input type="number" className="form-control ms-2" id="inputDurationTime" aria-describedby="inputDurationTime"
                style={{width:"75px"}}
                onChange={e => setDurationTime(e.target.value)}/>
                <div className="ms-3">
                  <button className='btn me-1' type="submit">{IconSetting(<MdOutlineCheckCircleOutline/>, 'green')}</button>
                  <span>{IconSetting(<MdOutlineRemoveCircleOutline/>, 'red')}</span> 
                </div>
            </form>
          </div>
          <div className="chart">
            <DoughnutChart dataset={rightActivities} durationTime={handleDuration}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlannerDescription