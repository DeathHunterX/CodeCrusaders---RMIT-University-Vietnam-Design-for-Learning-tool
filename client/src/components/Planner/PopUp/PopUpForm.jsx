import React from 'react'
import ActivityWindow from "./ActivityWindow/ActivityWindow"
import Module from './Module'

const PopUpForm = ({activityData, activityFunction}) => {
    const {popUpStat, moduleData, activityType, editedItm, activitiesData} = activityData
    const {handleSubmitForm, handleClosePopUp, handleChangeInput, setActivitiesData} = activityFunction

    const ModuleFormData = {popUpStat, moduleData};
    const ModuleFormFunction = {handleSubmitForm, handleClosePopUp, handleChangeInput};

    const ActivityFormData = {popUpStat, activityType, editedItm, activitiesData}
    const ActivityFormFunction = {handleClosePopUp, setActivitiesData}

    return (
        <div className={`course_planner_popup_form ${popUpStat.state === true ? 'active' : ''}`}>
            <div className="overlay"></div>

            <ActivityWindow compData={ActivityFormData} compFunction={ActivityFormFunction}/>

            <Module compData={ModuleFormData} compFunction={ModuleFormFunction} />
            
        </div>
    )
}

export default PopUpForm