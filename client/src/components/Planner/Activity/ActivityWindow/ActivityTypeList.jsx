import React, { useMemo} from 'react'


import { ActivityCardList, ActivityTypeMap } from '../Map/ActivityCardList'
import { IconSetting } from '../../../../utils/IconSetting'
import { GoCheckCircleFill } from 'react-icons/go'


const ActivityTypeList = ({type, data, setData, createActivity , saveActivity}) => {
    const {activityID, duration, activityType, engagementOption, activityInstruction, activityInput} = data

    const activityTypeResult = useMemo(() => ActivityTypeMap.find((activity) => activityID === activity.activityID), [activityID])

    const activityCardData = useMemo(() => ActivityCardList.find((card) => activityTypeResult.activityID === card.activityID), [activityTypeResult])
    
    const handleChangeOption = (id) => {
        if (activityID === 'warm_up'){
            setData((state) => ({
                ...state,
                activityType: id,
                engagementOption: activityTypeResult.activityType.find((item) => id === item.activityTypeID).activityTypeOption[0].optionID 
            }))

        }
        else {
            setData((state) => ({
                ...state,
                activityType: id
            }))
        }
    }

    const handleInputArrayChange = (e, activityTypeID, formID) => {
        const { value } = e.target;
        setData((prevState) => {
            let inputArr = [...activityInput];
            const existingIndex = inputArr.findIndex((item) => item.activityTypeID === activityTypeID && item.formID === formID);
            
            if (existingIndex !== -1) {
                // Update existing item
                inputArr[existingIndex].formValue = value
            } else {
                // Create new item
                const newItem = {
                    formID: formID,
                    formValue: value,
                    activityTypeID: activityTypeID,
                };
                inputArr = [...inputArr, newItem];
            }
      
            return {
              ...prevState,
              activityInput: inputArr,
            }
        });
    };



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
                                    activityTypeResult.activityType.map((item) => (
                                        <button className={`activity_form_btn ${activityType === item.activityTypeID && 'btn_selected'}`}
                                        style={{
                                            borderColor: activityType === item.activityTypeID && activityCardData.activityIconBg
                                        }}
                                        onClick={() => handleChangeOption(item.activityTypeID)}
                                        key={item.activityTypeID}
                                        >
                                            <span className="btn_label">
                                                <span className="activity_form_name btn_label_subtitle">{item.activityTypeName}</span>
                                                {
                                                    activityType === item.activityTypeID && (
                                                        <span className="btn_label_checked" >
                                                            {IconSetting(<GoCheckCircleFill/>, activityCardData.activityIconBg)}
                                                        </span>
                                                    )
                                                }
                                                
                                                <div className="btn_icon_middle">
                                                    {IconSetting(item.activityTypeIcon, activityCardData.activityIconBg)}
                                                </div>
                                            </span>
                                        </button>
                                    )
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
                        (activityType === item.activityTypeID && (
                            <div className="activity_form_wrapper" style={{textAlign: 'center'}} key={item.activityTypeID}>
                                <span className="activity_form_name" style={{color: activityCardData.activityIconBg}}>{item.activityTypeName}</span>
                                <p className="activity_form_desc my-3">
                                    {item.activityTypeDesc}
                                </p>
                                <div className="activity_form_break" style={{width: "100%", border: `1px solid ${activityCardData.activityIconBg}`}}></div>

                                <div className="activity_duration">
                                    <span className="duration_text">Total Duration:</span>
                                    <div className="duration_box">
                                    <input type="number" className="duration_input" min={5} max={480} aria-label='min'
                                    name='duration' value={duration}
                                    onChange={(e) => setData((state) => ({...state, [e.target.name]: parseInt(e.target.value)}))}/>
                                    <div className="duration_subtitle_box">
                                        <p className="duration_subtitle">mins</p>
                                    </div>
                                    </div>
                                </div>

                                {
                                    item.activityTypeFill === 'option' && (
                                        <>
                                        <div className="activity_subsection">
                                            <span className="subsection_text">Choose an engagement option</span>
                                            <span className="subsection_subtext ">How do you want learners to engage with the Do Now?</span>
                                        </div>
                                        <div className="activity_grid">
                                            <div className="activity_grid_inner">
                                                {
                                                item.activityTypeOption.map((subItm) => {
                                                    return (
                                                    <button className={`grid_btn ${engagementOption === subItm.optionID && 'selected'}`} 
                                                    onClick={() => setData((state) => ({...state, engagementOption: subItm.optionID}))}
                                                    key={subItm.optionID}
                                                    >
                                                        <span>{subItm.optionName}</span>
                                                    </button>
                                                )})}
                                            
                                            </div>
                                        </div>
                                        </>
                                    )
                                }

                                {
                                    (item.activityTypeFill === 'form' && item.activityTypeForm === 'input') && (
                                        <>                          
                                            <div className="activity_subsection">
                                                {item.activityFormList.map((subItm) => (
                                                    <div className="" key={subItm.formID}>
                                                        <span className="subsection_text">{subItm.formName}</span>
                                                        <div className="form-floating mb-3">
                                                            <input type="text" className="form-control" id={subItm.formID} 
                                                            placeholder={subItm.formDesc} 
                                                            name={subItm.formID}
                                                            value={activityInput ? activityInput.find((type) => (type.activityTypeID === item.activityTypeID 
                                                            && type.formID === subItm.formID))?.formValue : ""}
                                                            onChange={(e) => handleInputArrayChange(e, item.activityTypeID, subItm.formID)
                                                            }/>
                                                            <label htmlFor="floatingInput">{subItm.formDesc}</label>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                        
                                    )
                                }

                                {
                                    (item.activityTypeFill === 'form' && item.activityTypeForm === 'textarea') && (
                                        <>
                                            <div className="activity_subsection">
                                                <span className="subsection_text"> 
                                                Describe your activity instruction
                                                <span style={{color: 'red'}}>*</span>
                                                :    
                                                </span>
                                                <textarea className="subsection_textarea" 
                                                name="activityInstruction" 
                                                id="activityInstruction" 
                                                rows="8"
                                                placeholder="What is the task or exercise you want learners to work on or think about now?" 
                                                value={activityInstruction}
                                                onChange={(e) => setData((state) => ({...state, [e.target.name]: e.target.value}))}
                                                />
                                                <div className="d-flex justify-content-end text-danger">
                                                    <small className="">{activityInstruction.length ? activityInstruction.length : 0} / 100</small>
                                                </div>
                                            </div>

                                            
                                        </>
                                    )
                                }

                                {
                                    item.activityTypeFill === '' && (<></>)
                                }
                            </div>
                        ))             
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