import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { ActivityCardList } from '../Map/ActivityCardList'
import ActivityCard from '../Card/ActivityCard'

import {TfiAlarmClock} from 'react-icons/tfi'
import {GoCheckCircleFill} from 'react-icons/go'
import { IconSetting } from '../../../../utils/IconSetting'

const ActivityWindow = ({isCreated = false, activityWindow, setActivityWindow}) => {
  return (
    <div className="activity_dialog dialog_activation">
      <div className="dialog_overlay"></div>
      <div className="dialog_container">
        <div className="dialog_close" onClick={() => setActivityWindow(!activityWindow)}><AiOutlineClose/></div>
        <div className="dialog_container_inner">

          <div className="activity_section" style={{background: "rgb(224, 224, 224)", maxHeight: "90vh", height: "100%"}}>
              <div className="activity_wrapper">
                  <div className="activity_wrapper_inner">
                      <ul style={{paddingLeft: '0'}}>
                          {ActivityCardList.map((activity_itm, idx) => (      
                              <ActivityCard 
                              key={activity_itm.activityID}
                              id={activity_itm.activityID}
                              index={idx}
                              data={activity_itm}
                              // moveCard={moveCard}
                              />    
                          ))}
                          
                      </ul>
                  </div>        
              </div>  
          </div> 

          <div className="activity_form">
            <span className="activity_form_name" style={{color: "#E64A19"}}>Warm Up</span>
            <p className="activity_form_desc">Engage the class with a short energy boosting activity or introduce a concept.</p>
            <div className="activity_form_btn_group">
              <div className="activity_form_btn_group_vertical">
                
                <button className="activity_form_btn btn_selected" style={{borderColor: "#E64A19"}}>
                  <span className="btn_label">
                    <span className="activity_form_name btn_label_subtitle">Do Now</span>
                    <span className="btn_label_checked" >
                      {IconSetting(<GoCheckCircleFill/>, '#E64A19')}
                    </span>
                    <div className="btn_icon_middle">
                      {IconSetting(<TfiAlarmClock/>, '#E64A19')}
                    </div>
                  </span>
                </button>

                <button className="activity_form_btn">
                  <span className="btn_label">
                    <span className="activity_form_name btn_label_subtitle">Do Now</span>
                    
                    <div className="btn_icon_middle">
                      {IconSetting(<TfiAlarmClock/>, '#E64A19')}
                    </div>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="activity_form">
            <span>Do Now</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityWindow