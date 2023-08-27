import React from 'react'

import { ActivityCardList, ActivityTypeMap} from '../Map/ActivityCardList'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { BiEditAlt } from 'react-icons/bi'

const ActivityCard = ({isEditable=false, data, board, setData, openAddEditDialog, setEditedItm, setDeleteItm}) => {
    const ActivityFilter = ActivityCardList.find((activity) => data.activityID === activity.activityID)
    
    const findActivityType = 
        data.warmUpOption 
        ? 
        ((ActivityTypeMap.find((activity) => data.activityID === activity.activityID))?.activityType.find((type) => data.warmUpOption === type.activityTypeID))
        :
        data.readWatchListenType
        ?
        ((ActivityTypeMap.find((activity) => data.activityID === activity.activityID))?.activityType.find((type) => data.readWatchListenType === type.activityTypeID))
        :
        data.reflectionType
        ?
        ((ActivityTypeMap.find((activity) => data.activityID === activity.activityID))?.activityType.find((type) => data.reflectionType === type.activityTypeID))
        :
        data.groupType
        ?
        ((ActivityTypeMap.find((activity) => data.activityID === activity.activityID))?.activityType.find((type) => data.groupType === type.activityTypeID))
        :
        data.collaborateType
        ?
        ((ActivityTypeMap.find((activity) => data.activityID === activity.activityID))?.activityType.find((type) => data.collaborateType === type.activityTypeID))
        :
        data.accessType
        ?
        ((ActivityTypeMap.find((activity) => data.activityID === activity.activityID))?.activityType.find((type) => data.accessType === type.activityTypeID))
        :
        ((ActivityTypeMap.find((activity) => data.activityID === activity.activityID))?.activityType.find((type) => data.breakType === type.activityTypeID))

    const getCardData = (item) => {
        // handle state data base on activityID
        const getActivityType = ActivityTypeMap.find((activity) => item === activity.activityID)
        const getActivityCard = ActivityCardList.find((activity) => item === activity.activityID)

        
        switch (item) {
            case 'warm_up':
                setData({
                    activityID: item,
                    activityName: getActivityCard.activityName,
                    duration: 10,
                    warmUpOption: getActivityType?.activityType[0].activityTypeID,
                    engagementOption: getActivityType?.activityType[0]?.activityTypeOption[0].optionID
                })
                break;
            case 'read_watch_listen':
                setData({
                    activityID: item,
                    activityName: getActivityCard.activityName,
                    duration: 10,
                    readWatchListenType: getActivityType.activityType[0].activityTypeID,
                })
                break;
            case 'reflect':
                setData({
                    activityID: item,
                    activityName: getActivityCard.activityName,
                    duration: 10,
                    reflectionType: getActivityType.activityType[0].activityTypeID,
                })
                break;
            case 'discuss':
                setData({
                    activityID: item,
                    activityName: getActivityCard.activityName,
                    duration: 10,
                    groupType: getActivityType.activityType[0].activityTypeID ,
                })
                break;
            case 'collaborate':
                setData({
                    activityID: item,
                    activityName: getActivityCard.activityName,
                    duration: 10,
                    collaborateType: getActivityType.activityType[0].activityTypeID ,
                })
                break;
            case 'access':
                setData({
                    activityID: item,
                    activityName: getActivityCard.activityName,
                    duration: 10,
                    accessType: getActivityType.activityType[0].activityTypeID ,
                })
                break
            default:
                setData({
                    activityID: item,
                    activityName: getActivityCard.activityName,
                    duration: 10,
                    breakType: getActivityType.activityType[0].activityTypeID ,
                })
        }        
    }

    const openAddEditDialogByID = (data) => {
        openAddEditDialog("edit", board.sessionName)
        setEditedItm(data)  
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
                                <div className="edit_status me-2" onClick={() => openAddEditDialogByID(data)}>
                                    <BiEditAlt/>
                                </div>
                                <div className="delete_status" 
                                onClick={() => setDeleteItm(board, data.id)}
                                >
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