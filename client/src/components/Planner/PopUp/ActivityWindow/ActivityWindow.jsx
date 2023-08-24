import React, { Fragment, useEffect, useState } from 'react'

import { AiOutlineClose } from 'react-icons/ai'
import {toast} from 'react-toastify'

import { ActivityCardList} from '../../Activity/Map/ActivityCardList'
import ActivityCard from '../../Activity/Card/ActivityCard'
import ActivityTypeList from './ActivityTypeList'


const ActivityWindow = ({compData, compFunction}) => {
  const {popUpStat, activityType, activitiesData} = compData;
  const {handleClosePopUp, setActivitiesData, handleEditedData} = compFunction;

  const [activityData, setActivityData] = useState({})
  
  const {id, activityID} = activityData

  // console.log(activitiesData.filter(name))

  // useEffect(() => {
  //   if (activityType === 'edit' && editedData) {
  //     setActivityData(editedData)
  //   }
  // }, [editedData, type])
  

  const removeActivityFromDroppable = () => {
    setActivityData({});
  };



  const handleCreateActivity = () => {
    if (activityID){
      setActivitiesData(prevSession => 
        prevSession.map(session => {
          if (session.sessionName === activityType.board) {
            return {
              ...session,
              activityList: [...session.activityList, activityData]
            }
          }
          return session;
        })
      )
      handleClose()

    } else {
      toast.error("You need to select one activity")
    }
  }

  // const handleSaveActivity = () => {
  //   if (leftActivities.find((item) => item.id === id)) {
  //     setLeftActivities(prevLeftActivities => {
  //       return prevLeftActivities.map((board) => board.id === id ? activityData : board)
  //     })
  //   } else {
  //     setRightActivities(prevRightActivities => {
  //       return prevRightActivities.map(board =>
  //         board.name === tabName
  //           ? { ...board, data: board.data.map(activity => activity.id === id ? { ...activity, ...activityData } : activity) }
  //           : board
  //       );
  //     });
  //   }
  // }

  const handleClose = () => {
    handleClosePopUp()
    setActivityData({})
  }

  console.log(activityType)
  
  const activityFilter = ActivityCardList.find((activity) => activityID === activity.activityID)

  return (
    <div className="dialog_container" style={{display: popUpStat.formName === "activity" ? "block" : "none"}}>
      <div className="dialog_close" onClick={handleClose}><AiOutlineClose/></div>

      <div className="dialog_container_inner" style={{maxHeight: "90vh", height: "100%"}}>

        {activityType.state === 'add' && (
          <div className="activity_setup">
            <div className="activity_droppable mb-2" onClick={() => removeActivityFromDroppable()}>     
              <div className=""style={{height: "100px"}}>              
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
            </div>

            <div className="activity_section left_activity">
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
          <ActivityTypeList 
          type={activityType.state} 
          data={activityData} 
          setData={setActivityData} 
          createActivity={handleCreateActivity} 
          // saveActivity={handleSaveActivity}
          />
        )}
          
      </div>
    </div>
  )
}

export default ActivityWindow