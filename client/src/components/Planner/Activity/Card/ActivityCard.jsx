import React from 'react'

import {v4 as uuidv4} from 'uuid'

import { ActivityCardList, ActivityTypeMap} from '../Map/ActivityCardList'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { BiEditAlt } from 'react-icons/bi'

const ActivityCard = ({isEditable=false, data, setData, activityType, setActivityType, setActivityWindow, setEditedItm, setDeleteItm, tabName}) => {
    const ActivityFilter = ActivityCardList.find((activity) => data.activityID === activity.activityID)
    
    const findActivityType = (ActivityTypeMap.find((activity) => data.activityID === activity.activityID))?.activityType.find((type) => data.activityType === type.activityTypeID)
    
    const getCardData = (item) => {
        // handle state data base on activityID
            const activityTypeResult = ActivityTypeMap.find((activity) => item === activity.activityID)
            switch (item) {
                case 'warm_up':
                    setData({
                        id: uuidv4(), 
                        duration: 10,
                        activityID: item,
                        activityType: activityTypeResult?.activityType[0].activityTypeID,
                        engagementOption: activityTypeResult?.activityType[0]?.activityTypeOption[0].optionID
                    })
                    break;
                case 'read_watch_listen':
                    setData({
                        id: uuidv4(), 
                        duration: 10,
                        activityID: item,
                        activityType: activityTypeResult.activityType[0].activityTypeID ,
                        activityInstruction: ""
                    })
                    break;
                case 'reflect':
                    setData({
                        id: uuidv4(), 
                        duration: 10,
                        activityID: item,
                        activityType: activityTypeResult.activityType[0].activityTypeID ,
                        activityInput: []
                    })
                    break;
                default:
                    setData({
                        id: uuidv4(), 
                        duration: 10,
                        activityID: item,
                        activityType: activityTypeResult.activityType[0].activityTypeID ,
                        })
                    break;
            }
        
    }



    const openAddEditDialog = (id) => {
        setActivityWindow((state) => !state)
        if (activityType === 'add') {
            setActivityType('edit')
        }
        setEditedItm(id)
    }

    if (isEditable) {
        return (
            <li> 
                <div className="class_activity" style={{height: '100px', position:'relative'}}>
                    <div className="activity_card mb-3" style={{userSelect: 'none', boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}}>
                        <div className="activity_duration" style={{backgroundColor: `${ActivityFilter.activityIconBg}`}}>
                            <div className="activity_duration_box">
                                <span>{data.duration}</span>
                                <span>minutes</span>
                            </div>
                        </div>
                        <div className="activity_content">
                            <div className="content_body">
                                <h5 className="activity_name">{ActivityFilter.activityName}</h5>
                                <p className="activity_desc">{findActivityType.activityTypeName}</p>     
                            </div>
                            <div className="content_status me-3">
                                <div className="edit_status me-2" onClick={() => openAddEditDialog(data.id)}>
                                    <BiEditAlt/>
                                </div>
                                <div className="delete_status" onClick={() => tabName? setDeleteItm(tabName, data.id) : setDeleteItm(data.id)}>
                                    <RiDeleteBin5Fill />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </li>
        )
    } else {
        return (
            <li> 
                <div className="class_activity" style={{height: '100px', position:'relative', cursor: 'pointer'}} onClick={() => getCardData(data.activityID)}>
                    <div className="activity_card mb-3" style={{userSelect: 'none'}}>
                        <div className="activity_symbols" style={{backgroundColor: `${data.activityIconBg}`}}>
                            {data.activityIcon}
                        </div>
                        <div className="activity_content">
                            <div className="content_body">
                                <h5 className="activity_name">{data.activityName}</h5>
                                <p className="activity_desc">{data.activityDescription}</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </li>
        )
    }
    
}

export default ActivityCard