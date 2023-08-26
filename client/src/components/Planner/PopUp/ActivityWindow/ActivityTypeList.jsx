import React, { useMemo} from 'react'


import { ActivityCardList, ActivityTypeMap } from '../../Activity/Map/ActivityCardList'
import { IconSetting } from '../../../../utils/IconSetting'
import { GoCheckCircleFill } from 'react-icons/go'


const ActivityTypeList = ({type, data, setData, createActivity , saveActivity}) => {
    const {
        activityID, 
        activityName, 
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
                                        
                                        // return (
                                        //     <button className={`activity_form_btn ${activityType === item.activityTypeID && 'btn_selected'}`}
                                        //     style={{
                                        //         borderColor: activityType === item.activityTypeID && activityCardData.activityIconBg
                                        //     }}
                                        //     onClick={() => handleChangeOption(item.activityTypeID)}
                                        //     key={item.activityTypeID}
                                        //     >
                                        //         <span className="btn_label">
                                        //             <span className="activity_form_name btn_label_subtitle">{item.activityTypeName}</span>
                                        //             {
                                        //                 activityType === item.activityTypeID && (
                                        //                     <span className="btn_label_checked" >
                                        //                         {IconSetting(<GoCheckCircleFill/>, activityCardData.activityIconBg)}
                                        //                     </span>
                                        //                 )
                                        //             }
                                                    
                                        //             <div className="btn_icon_middle">
                                        //                 {IconSetting(item.activityTypeIcon, activityCardData.activityIconBg)}
                                        //             </div>
                                        //         </span>
                                        //     </button>
                                        // )
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
                        (
                            <></>
                            // activityType === item.activityTypeID && (
                            //     <div className="activity_form_wrapper" style={{textAlign: 'center'}} key={item.activityTypeID}>
                            //         <span className="activity_form_name" style={{color: activityCardData.activityIconBg}}>{item.activityTypeName}</span>
                            //         <p className="activity_form_desc my-3">
                            //             {item.activityTypeDesc}
                            //         </p>
                            //         <div className="activity_form_break" style={{width: "100%", border: `1px solid ${activityCardData.activityIconBg}`}}></div>

                            //         <div className="activity_duration">
                            //             <span className="duration_text">Total Duration:</span>
                            //             <div className="duration_box">
                            //             <input type="number" className="duration_input" min={5} max={480} aria-label='min'
                            //             name='duration' value={duration}
                            //             onChange={(e) => setData((state) => ({...state, [e.target.name]: parseInt(e.target.value)}))}/>
                            //             <div className="duration_subtitle_box">
                            //                 <p className="duration_subtitle">mins</p>
                            //             </div>
                            //             </div>
                            //         </div>

                            //         {
                            //             item.activityTypeFill === 'option' && (
                            //                 <React.Fragment>
                            //                 <div className="activity_subsection">
                            //                     <span className="subsection_text">Choose an engagement option</span>
                            //                     <span className="subsection_subtext ">How do you want learners to engage with the Do Now?</span>
                            //                 </div>
                            //                 <div className="activity_grid">
                            //                     <div className="activity_grid_inner">
                            //                         {
                            //                         item.activityTypeOption.map((subItm) => {
                            //                             return (
                            //                             <button className={`grid_btn ${engagementOption === subItm.optionID && 'selected'}`} 
                            //                             onClick={() => setData((state) => ({...state, engagementOption: subItm.optionID}))}
                            //                             key={subItm.optionID}
                            //                             >
                            //                                 <span>{subItm.optionName}</span>
                            //                             </button>
                            //                         )})}
                                                
                            //                     </div>
                            //                 </div>
                            //                 </React.Fragment>
                            //             )
                            //         }

                            //         {
                            //             item.activityTypeFill === '' && (<React.Fragment></React.Fragment>)
                            //         }
                            //     </div>
                            // )
                        )             
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