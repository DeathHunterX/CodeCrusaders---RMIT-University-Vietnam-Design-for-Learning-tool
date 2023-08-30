import React, { useEffect, useState } from 'react'

import { AiOutlineClose } from 'react-icons/ai'
import {toast} from 'react-toastify'

import { ActivityCardList} from '../../Item/ActivityCardList'
import ActivityCard from '../../Item/ActivityCard'
import ActivityTypeList from './ActivityTypeList'
import { useDispatch, useSelector } from 'react-redux'
import { createActivity, emptyActivityItem, resetSessionState, updateActivity } from '../../../../redux/slices/sessionSlice'
import { useParams} from 'react-router-dom'


const ActivityWindow = ({compData, compFunction}) => {
  const {popUpStat, activityType, editedItm, activitiesData} = compData;
  const {handleClosePopUp, setActivitiesData} = compFunction;

  const [activityData, setActivityData] = useState({})

  const {activityID} = activityData

  const {id} = useParams()
  
  const {accessToken} = useSelector(state => state.auth.token)
  const {isCreated, isActivityUpdated, isError, activityItem, message} = useSelector(state => state.session)

  useEffect(() => {
    if (activityType.state === 'edit' && editedItm) {
      setActivityData(editedItm)
    }
  }, [activityType, editedItm])
  
  const dispatch = useDispatch()

  const removeActivityFromDroppable = () => {
    setActivityData({});
  };



  const handleCreateActivity = () => {
    if (activityID){
      const findSession = activitiesData.find(session => session.sessionName === activityType.board)

      dispatch(createActivity({courseID: id, sessionID: findSession.id, activityData: activityData, token: accessToken}))

      handleClose()

    } else {
      toast.error("You need to select one activity")
    }
  }

  
  const handleSaveActivity = () => {
    const activityWithoutId = Object.fromEntries(Object.entries(activityData).filter(([key]) => key !== "id"));
    dispatch(updateActivity({courseID: id, activityID: activityData.id, activityData: activityWithoutId, token: accessToken}))

    
    handleClose()
  }

  useEffect(() => {
    if(isCreated) {
      setActivitiesData(prevSession => 
        prevSession.map(session => {
          if (session.sessionName === activityType.board) {
            return {
              ...session,
              activityList: [...session.activityList, activityItem]
            }
          }

          return session;
        })
      )
      dispatch(emptyActivityItem())
      dispatch(resetSessionState())
    } else if (isActivityUpdated) {
      setActivitiesData(prevSession => 
        prevSession.map(session => 
          session.sessionName === activityType.board ?
            {
              ...session,
              activityList: session.activityList.map(activity => activity.id === activityItem.id ? {...activity, ...activityItem} : activity)
            }
            :
            session
        )
      )
      dispatch(emptyActivityItem())
      dispatch(resetSessionState())
    } else if (isError) {
      toast.error(message)
      dispatch(resetSessionState())
    }
  } ,[activityData, activityItem, activityType.board, dispatch, isActivityUpdated, isCreated, isError, message, setActivitiesData])

  

  const handleClose = () => {
    handleClosePopUp()
    setActivityData({})
  }

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
          saveActivity={handleSaveActivity}
          />
        )}
          
      </div>
    </div>
  )
}

export default ActivityWindow