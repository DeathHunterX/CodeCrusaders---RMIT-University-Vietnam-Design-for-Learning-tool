import React, { useState } from 'react'
import CourseDetail from './CourseDetail'
import FeatureOptions from './FeatureOptions'
import MoreOptions from './MoreOptions'


const SettingComponent = () => {
    const [activeTabs, setActiveTabs] = useState(0)
    const settingsMap = [
        {header: 'Course Details', component: <CourseDetail/>}, 
        {header: 'Feature Options', component: <FeatureOptions/>},
        {header: 'More Options', component: <MoreOptions/>}
      ]
    return (
        <div className="tabs_container ms-4 me-4">
            <div className="tabs_header">
            {
                settingsMap.map((entry,idx) => (
                <div
                    className={`tabs ${activeTabs === idx ? "active_tabs" : ""}`}
                    onClick={() => setActiveTabs(idx)} key={idx}
                >
                    {entry.header}
                </div>
                ))
            }
            </div>

            <div className="tabs_body mt-4">
                {settingsMap[activeTabs].component}
            </div>
      </div>
    )
}

export default SettingComponent