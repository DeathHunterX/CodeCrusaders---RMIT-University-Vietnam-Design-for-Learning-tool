import React from 'react'
import ActivityWindow from "./ActivityWindow/ActivityWindow"
import Module from './Module'

const PopUpForm = ({activityData, activityFunction}) => {
    const {popUpStat, moduleData, activityType, activitiesData} = activityData
    const {handleSubmitForm, handleClosePopUp, handleChangeInput, setActivitiesData} = activityFunction

    const ModuleFormData = {popUpStat, moduleData};
    const ModuleFormFunction = {handleSubmitForm, handleClosePopUp, handleChangeInput};

    const ActivityFormData = {popUpStat, activityType, activitiesData}
    const ActivityFormFunction = {handleClosePopUp, setActivitiesData}

    return (
        <React.Fragment>
            <div className={`course_planner_popup_form ${popUpStat.state === true ? 'active' : ''}`}>
                <div className="overlay"></div>

                <ActivityWindow compData={ActivityFormData} compFunction={ActivityFormFunction}/>

                <Module compData={ModuleFormData} compFunction={ModuleFormFunction} />
                
            </div>
        </React.Fragment>
    )
}

export default PopUpForm