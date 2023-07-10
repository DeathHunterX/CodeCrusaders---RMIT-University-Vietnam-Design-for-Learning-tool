import React, {useEffect, useState} from 'react'

import DoughnutChart from '../DoughnutChart'

import {IconSetting} from '../../../utils/IconSetting'
import { MdOutlineCheckCircleOutline, MdOutlineRemoveCircleOutline } from 'react-icons/md'
import ActivityCard from '../Activity/Card/ActivityCard'
import { Draggable, Droppable } from '@hello-pangea/dnd'

const PlannerDescription = ({data, tabName, rightActivities, activityType, setActivityType, setActivityWindow, setEditedItm, setDeleteItm}) => {
  const [durationTime, setDurationTime] = useState(0)
  const [handleDuration, setHandleDuration] = useState(0)

  const [timeline, setTimeline] = useState([])
  console.log(timeline)
  //handle set timeline base on rightActivities length
  useEffect(() => {
    const getDataLength = (rightActivities.find((board) => board.name === tabName) || { data: [] }).data.length
    if (getDataLength > 0) {
      const getDataDuration = (rightActivities.find((board) => board.name === tabName) || { data: [] })
                              .data.map((activity) => parseInt(activity.activityDuration, 10))
                              .filter((duration) => !isNaN(duration));
      // console.log(getDataDuration)

      const timelineHandle = getDataDuration.reduce((acc, duration, index) => {
        const lastTime = index === 0 ? '00:00' : acc[index - 1];
        const [hours, minutes] = lastTime.split(':').map(Number);
      
        const newMinutes = minutes + duration;
        const newHours = hours + Math.floor(newMinutes / 60);
        const formattedTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes % 60).padStart(2, '0')}`;
      
        return [...acc, formattedTime];
      }, []);
      
      setTimeline(['00:00', ...timelineHandle])
    }
        
  }, [rightActivities, tabName])


  const handleSubmit = (e) => {
      e.preventDefault()
      setHandleDuration(durationTime)
  }

  return (
    <div className="right_board d-flex">
      <div className="col-5 d-flex">
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
                </ul>
              )}
              
            </Droppable>
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
                style={{width:"75px"}} min={0} max={320}
                onChange={e => setDurationTime(e.target.value)}/>
                <div className="ms-3">
                  <button className='btn me-1' type="submit">{IconSetting(<MdOutlineCheckCircleOutline/>, 'green')}</button>
                  <span>{IconSetting(<MdOutlineRemoveCircleOutline/>, 'red')}</span> 
                </div>
            </form>
          </div>
          <div className="chart">
            <DoughnutChart dataset={data.data} durationTime={handleDuration}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlannerDescription