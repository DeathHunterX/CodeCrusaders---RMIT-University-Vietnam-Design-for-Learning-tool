import React, { Fragment, useMemo} from 'react'
import { ActivityCardList, ActivityTypeMap } from '../../Activity/Map/ActivityCardList'

import MiddleActivityForm from './MiddleActivityForm'
import FinalActivityForm from './FinalActivityForm'


const ActivityTypeList = ({type, data, setData, createActivity , saveActivity}) => {
    const {
        activityID,  
        duration, 
        warmUpOption, 
        engagementOption,
        readWatchListenType, 
        reflectionType,
        groupType,
        collaborateType,
        accessType,
        breakType
    } = data

    const activityTypeResult = useMemo(() => ActivityTypeMap.find((activity) => activityID === activity.activityID), [activityID])

    const activityCardData = useMemo(() => ActivityCardList.find((card) => activityTypeResult.activityID === card.activityID), [activityTypeResult])
    
    const handleChangeOption = (id) => {
        switch (activityID) {
            case 'warm_up':
                setData((state) => ({
                    ...state,
                    warmUpOption: id,
                    engagementOption: activityTypeResult.activityType.find((item) => id === item.activityTypeID).activityTypeOption[0].optionID 
                }))
                break;
            case 'read_watch_listen':
                setData((state) => ({
                    ...state,
                    readWatchListenType: id,
                }))
                break;
            case 'reflect':
                setData((state) => ({
                    ...state,
                    reflectionType: id,
                }))
                break;
            case 'discuss':
                setData((state) => ({
                    ...state,
                    groupType: id,
                }))
                break;
            case 'collaborate':
                setData((state) => ({
                    ...state,
                    collaborateType: id,
                }))
                break;
            case 'access':
                setData((state) => ({
                    ...state,
                    accessType: id,
                }))
                break
            default:
                setData((state) => ({
                    ...state,
                    breakType: id,
                }))
        }  
    }

    return (
        <div className="right_activity">
            {
                activityTypeResult.activityType && (
                    <div className="activity_form">             
                        <span className="activity_form_name" style={{color: activityCardData.activityIconBg}}>{activityCardData.activityName}</span>
                        <p className="activity_form_desc my-1">
                            {activityCardData.activityDescription}
                        </p>
                        <div className="activity_form_btn_group mb-4">
                            
                            <div className="activity_form_btn_group_vertical">
                                {
                                    activityTypeResult.activityType.map((item) => {
                                        const MiddleActivityFormData = {item, activityCardData}
                                        const MiddleActivityFormFunction = {handleChangeOption}

                                        
                                        return (
                                            <Fragment key={item.activityTypeID}>
                                                {
                                                    warmUpOption ?
                                                    <MiddleActivityForm activityType={warmUpOption} 
                                                        compData={MiddleActivityFormData} 
                                                        compFunction={MiddleActivityFormFunction}
                                                    />
                                                    :
                                                    readWatchListenType ?
                                                    <MiddleActivityForm activityType={readWatchListenType} 
                                                        compData={MiddleActivityFormData} 
                                                        compFunction={MiddleActivityFormFunction}
                                                    />
                                                    :
                                                    reflectionType ?
                                                    <MiddleActivityForm activityType={reflectionType} 
                                                        compData={MiddleActivityFormData} 
                                                        compFunction={MiddleActivityFormFunction}
                                                    />
                                                    :
                                                    groupType ?
                                                    <MiddleActivityForm activityType={groupType} 
                                                        compData={MiddleActivityFormData} 
                                                        compFunction={MiddleActivityFormFunction}
                                                    />
                                                    :
                                                    collaborateType ?
                                                    <MiddleActivityForm activityType={collaborateType} 
                                                        compData={MiddleActivityFormData} 
                                                        compFunction={MiddleActivityFormFunction}
                                                    />
                                                    :
                                                    accessType ?
                                                    <MiddleActivityForm activityType={accessType} 
                                                        compData={MiddleActivityFormData} 
                                                        compFunction={MiddleActivityFormFunction}
                                                    />
                                                    :
                                
                                                    <MiddleActivityForm activityType={breakType} 
                                                        compData={MiddleActivityFormData} 
                                                        compFunction={MiddleActivityFormFunction}
                                                    />
                                                    
                                                }
                                            </Fragment>
                                            
                                        )
                                    }
                                )}
                            
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="activity_form" style={{justifyContent: 'space-between'}}>
                <div className="w-100">
                {
                    activityTypeResult.activityType && activityTypeResult.activityType.map((item) =>
                        {
                            const FinalActivityFormData = {item, activityCardData, duration, engagementOption}
                            const FinalActivityFormFunction = {setData}

                            return (
                                <Fragment key={item.activityTypeID}>
                                    {
                                        warmUpOption ?
                                        <FinalActivityForm activityType={warmUpOption} 
                                            compData={FinalActivityFormData} 
                                            compFunction={FinalActivityFormFunction}
                                        />
                                        :
                                        readWatchListenType ?
                                        <FinalActivityForm activityType={readWatchListenType} 
                                            compData={FinalActivityFormData} 
                                            compFunction={FinalActivityFormFunction}
                                        />
                                        :
                                        reflectionType ?
                                        <FinalActivityForm activityType={reflectionType} 
                                            compData={FinalActivityFormData} 
                                            compFunction={FinalActivityFormFunction}
                                        />
                                        :
                                        groupType ?
                                        <FinalActivityForm activityType={groupType} 
                                            compData={FinalActivityFormData} 
                                            compFunction={FinalActivityFormFunction}
                                        />
                                        :
                                        collaborateType ?
                                        <FinalActivityForm activityType={collaborateType} 
                                            compData={FinalActivityFormData} 
                                            compFunction={FinalActivityFormFunction}
                                        />
                                        :
                                        accessType ?
                                        <FinalActivityForm activityType={accessType} 
                                            compData={FinalActivityFormData} 
                                            compFunction={FinalActivityFormFunction}
                                        />
                                        :
                    
                                        <FinalActivityForm activityType={breakType} 
                                            compData={FinalActivityFormData} 
                                            compFunction={FinalActivityFormFunction}
                                        />
                                        
                                    }
                                </Fragment>
                            )
                        }           
                    ) 
                }
                </div>
                
                <div className="activity_footer">
                    <button className="btn btn-info text-white w-50" 
                    onClick={type === 'add' ? createActivity : saveActivity}
                    >
                        {type === 'add' ? 'Create' : 'Save Card'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ActivityTypeList