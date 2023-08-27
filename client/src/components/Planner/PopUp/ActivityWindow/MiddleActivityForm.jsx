import React from 'react'
import { IconSetting } from '../../../../utils/IconSetting';
import { GoCheckCircleFill } from 'react-icons/go';

const MiddleActivityForm = ({activityType, compData, compFunction}) => {
    const {item, activityCardData} = compData;
    const {handleChangeOption} = compFunction;
    return (
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
}

export default MiddleActivityForm