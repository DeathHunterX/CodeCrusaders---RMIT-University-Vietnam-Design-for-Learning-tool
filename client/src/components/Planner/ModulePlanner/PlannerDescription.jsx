import React, {useEffect, useState} from 'react'

import DoughnutChart from '../DoughnutChart'

import {IconSetting} from '../../../utils/IconSetting'
import { MdOutlineCheckCircleOutline, MdOutlineRemoveCircleOutline } from 'react-icons/md'
import ActivityCard from '../Activity/Card/ActivityCard'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import { RiEdit2Line } from 'react-icons/ri'

const PlannerDescription = ({data, tabName, rightActivities, activityType, setActivityType, setActivityWindow, setEditedItm, setDeleteItm}) => {
  const [durationTime, setDurationTime] = useState(90)

  // handle time when input
  const [time, setTime] = useState(durationTime)

  const [editDuration, setEditDuration] = useState(false)
  const [timeline, setTimeline] = useState([])

  const getDataLength = (rightActivities.find((board) => board.name === tabName) || { data: [] }).data.length
  
  //handle set timeline base on rightActivities length
  useEffect(() => {

    if (getDataLength > 0) {
      const getDataDuration = (rightActivities.find((board) => board.name === tabName) || { data: [] })
                              .data.map((activity) => parseInt(activity.duration, 10))
                              .filter((duration) => !isNaN(duration));


      const timelineHandle = getDataDuration.reduce((acc, duration, index) => {
        const lastTime = index === 0 ? '00:00' : acc[index - 1];
        const [hours, minutes] = lastTime.split(':').map(Number);
      
        const newMinutes = minutes + duration;
        const newHours = hours + Math.floor(newMinutes / 60);
        const formattedTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes % 60).padStart(2, '0')}`;
      
        return [...acc, formattedTime];
      }, []);
      
      setTimeline(['00:00', ...timelineHandle])
    } else {
      setTimeline([])
    }
        
  }, [getDataLength, rightActivities, tabName])
  


  const handleChangeDuration = () => {
    setDurationTime(time)
    setEditDuration((state) => !state)
  }
  return (
    <div className="activity_planner_inner_container d-flex">
      <div className="left_side">
        <div className="activity_board_container">
          <div className="activity_board_inner_container">
            <ul className="activity_time_list" style={{paddingLeft: '0', textAlign: 'center'}}>
              {timeline &&
                <>
                  <li style={{height: '100px', position: 'relative', top: 0}}>{timeline[0]}</li>
                  {(timeline.slice(1)).map((time, idx) =>(
                    <li style={{height: '100px', position: 'relative', top: '-30px'}} key={idx}>
                      {time}
                      <div style={{borderTop: "1px dashed rgb(204, 204, 204)", width: "74px", position: "absolute"}}></div>
                    </li>
                  ))}
                </>
              }
              
              
            </ul>
            <Droppable droppableId={data.name}>
              {(provided) => (
                <ul className="activity_list" style={{paddingLeft: '0'}}
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                >
                  
                  {data.data.map((activity_itm, idx) => (   
      
                    <Draggable key={activity_itm.id} draggableId={activity_itm.id} index={idx}>
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? '0.5' : '1'
                            }}
                            >
                                <ActivityCard
                                    data={activity_itm}
                                    isEditable={true}
                                    activityType={activityType}
                                    setActivityType={setActivityType}
                                    setActivityWindow={setActivityWindow}
                                    setEditedItm={setEditedItm}
                                    setDeleteItm={setDeleteItm}
                                    tabName={data.name}
                                />
                            </div>

                        )}
                            
                    </Draggable>
                    
                  ))}
                  {provided.placeholder}

                  {
                    getDataLength === 0 && (
                      <div className="activity_list_message">
                        <span>Drag your first activity here</span>
                      </div>
                    )
                  }
                  
                </ul>
              )}
              
            </Droppable>
          </div>
        </div>
      </div>
      <div className="right_side">
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
      </div>
    </div>
  )
}

export default PlannerDescription