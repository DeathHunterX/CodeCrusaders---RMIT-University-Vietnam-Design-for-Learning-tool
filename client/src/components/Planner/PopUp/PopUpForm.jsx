import React from 'react'
import ActivityWindow from "./ActivityWindow/ActivityWindow"
import Module from './Module'

const PopUpForm = ({activityData, activityFunction}) => {
    const {popUpStat, moduleData, formName, activityType, leftActivities, rightActivities, activeTabs, handleEditedData} = activityData
    const {handleSubmitForm, handleClosePopUp, handleChangeInput, setLeftActivities, setRightActivities} = activityFunction

    const ModuleFormData = {formName, moduleData};
    const ModuleFormFunction = {handleSubmitForm, handleClosePopUp, handleChangeInput};

    const ActivityFormData = {formName, activityType}
    const ActivityFormFunction = {handleClosePopUp, handleEditedData}

    return (
        <React.Fragment>
            <div className={`course_planner_popup_form ${popUpStat === true ? 'active' : ''}`}>
                <div className="overlay"></div>

                {/* <ActivityWindow compData={ActivityFormData} compFunction={ActivityFormFunction}/> */}

                <Module compData={ModuleFormData} compFunction={ModuleFormFunction} />
                
            </div>
        </React.Fragment>
    )
}

export default PopUpForm