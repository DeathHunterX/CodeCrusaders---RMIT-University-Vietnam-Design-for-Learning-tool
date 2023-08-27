import {Fragment} from 'react'

const FinalActivityForm = ({activityType, compData, compFunction}) => {
    const {item, activityCardData, duration, engagementOption} = compData;
    const {setData} = compFunction;
    return (
        <Fragment>
            {
                activityType === item.activityTypeID && (
                    <div className="activity_form_wrapper" style={{textAlign: 'center'}}>
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
                                <Fragment>
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
                                </Fragment>
                            )
                        }

                        {
                            item.activityTypeFill === '' && (<Fragment></Fragment>)
                        }
                    </div>
                )
            }
        </Fragment>
    )
}

export default FinalActivityForm