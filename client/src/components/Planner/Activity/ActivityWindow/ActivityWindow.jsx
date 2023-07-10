import React, { useEffect, useState } from 'react'

import {v4 as uuidv4} from 'uuid'

import { AiOutlineClose } from 'react-icons/ai'
import { ActivityCardList} from '../Map/ActivityCardList'
import ActivityCard from '../Card/ActivityCard'

import ActivityTypeList from './ActivityTypeList'

const ActivityWindow = ({type, leftActivities, setLeftActivities, setRightActivities, setActivityWindow, editedData, tabName}) => {

  const activityCardData = {
    id: uuidv4(),
    activityID: '',
    activityDuration: 10,
    activityType: '',
    option: '',
    activityInstruction: "",
    activityInput: []
  }

  const [activityData, setActivityData] = useState(activityCardData)
  const {id, activityID} = activityData
  console.log(activityData)

  useEffect(() => {
    if (type === 'edit' && editedData) {
      setActivityData(editedData)
    }
  }, [editedData, type])
  
  // console.log(activityCardData)

  const removeActivityFromDroppable = () => {
    setActivityData((state) => ({...state, activityID: ''}));
  };

  const handleCreateActivity = () => {
    if (activityID){
      setLeftActivities((preState) => [...preState, activityData])
      setActivityWindow((preState) => !preState)

    } else {
      console.log("You need to select one activity")
    }
  }

  const handleSaveActivity = () => {
    
    if (leftActivities.find((item) => item.id === id)) {
      setLeftActivities(prevLeftActivities => {
        return prevLeftActivities.map((board) => board.id === id ? activityData : board)
      })
    } else {
      setRightActivities(prevRightActivities => {
        return prevRightActivities.map(board =>
          board.name === tabName
            ? { ...board, data: board.data.map(activity => activity.id === id ? { ...activity, ...activityData } : activity) }
            : board
        );
      });
    }

    setActivityWindow((preState) => !preState)
  }
  
  const activityFilter = ActivityCardList.find((activity) => activityID === activity.activityID)

  return (
    <div className="activity_dialog dialog_activation">
      <div className="dialog_overlay"></div>
      <div className="dialog_container">
        <div className="dialog_close" onClick={() => setActivityWindow((preState) => !preState)}><AiOutlineClose/></div>
        <div className="dialog_container_inner" style={{maxHeight: "90vh", height: "100%"}}>

          {type === 'add' && (
            <div className="activity_setup">
              <div className="activity_droppable mb-2" onClick={() => removeActivityFromDroppable()}>     
                                  
                {activityID ? 
                  <ActivityCard 
                    id={activityFilter.activityID}
                    data={activityFilter}
                    setData={setActivityData}
                    isEdited={false}
                  />
                  :
                  <div className="activity_message">
                    <span>Drop here to select activity</span>
                  </div>
                }
                
              </div>

              <div className="activity_section left_activity" style={{background: "rgb(224, 224, 224)", height: '74vh'}}>
                <div className="activity_wrapper">
                    <div className="activity_wrapper_inner">
                        <ul style={{paddingLeft: '0'}}>
                            {ActivityCardList.map((activity_itm, idx) => (      
                                <ActivityCard 
                                key={activity_itm.activityID}
                                id={activity_itm.activityID}
                                index={idx}
                                data={activity_itm}
                                setData={setActivityData}
                                />    
                            ))}
                            
                        </ul>
                    </div>        
                  </div>  
              </div> 
            </div>
          )}
          
          
          {(activityID) && (
            <ActivityTypeList type={type} 
            data={activityData} 
            setData={setActivityData} 
            createActivity={handleCreateActivity} 
            saveActivity={handleSaveActivity}/>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default ActivityWindow