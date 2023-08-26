import React, {useEffect, useState} from 'react'

import DoughnutChart from '../DoughnutChart'

import {IconSetting} from '../../../utils/IconSetting'
import { MdOutlineCheckCircleOutline, MdOutlineRemoveCircleOutline } from 'react-icons/md'
import ActivityCard from '../Activity/Card/ActivityCard'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import { RiEdit2Line } from 'react-icons/ri'

const PlannerDescription = ({data, tabName, rightActivities, openAddEditDialog, setEditedItm, setDeleteItm}) => {
  const [durationTime, setDurationTime] = useState(90)

  // handle time when input
  const [time, setTime] = useState(durationTime)

  const [editDuration, setEditDuration] = useState(false)
  
  


  const handleChangeDuration = () => {
    setDurationTime(time)
    setEditDuration((state) => !state)
  }
  return (
    <div className="activity_planner_inner_container d-flex">



      {/* <div className="right_side">
        <div className="review_container">
          <div className="review_header ps-3 pe-3" style={{marginBottom: "10px"}}>
            <h5>Review</h5>
            <span>Here's a quick review of the session plan you created</span>
            <div className="duration_input d-flex align-items-center mt-1">
                <span>Duration Time:</span>
                {
                  editDuration ? (
                    <>
                      <input type="number" className="form-control ms-2" id="inputDurationTime" aria-describedby="inputDurationTime"
                      style={{width:"75px"}} min={0} max={320} value={time}
                      onChange={e => setTime(e.target.value)}/>
                      <div className="ms-3">
                        <button className='btn me-1' onClick={handleChangeDuration}>{IconSetting(<MdOutlineCheckCircleOutline/>, 'green')}</button>
                        <button className='btn' onClick={() => setEditDuration((state) => !state)}>{IconSetting(<MdOutlineRemoveCircleOutline/>, 'red')}</button> 
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="ms-4">{durationTime}</span>
                      <button className="btn" onClick={() => setEditDuration((state) => !state)}><RiEdit2Line/></button>
                    </>
                  )
                }
                
                
            </div>
          </div>
          <div className="chart">
            <DoughnutChart dataset={data.data} durationTime={durationTime}/>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default PlannerDescription