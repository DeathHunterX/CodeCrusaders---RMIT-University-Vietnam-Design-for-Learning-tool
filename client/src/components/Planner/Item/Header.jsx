
import {BsShareFill} from 'react-icons/bs'
import { ImBooks } from "react-icons/im"
import { IconSetting } from '../../../utils/IconSetting'

const CoursePlannerHeader = ({activityData, activityFunction}) => {
    const {setActiveSection, handleGoBackToCoursePage, handlePreviewData} = activityFunction
    const {subPage, configMap, activeSection} = activityData

    return (
        <div className="planner_header navbar navbar-expand-lg bg-body-tertiary" style={{height: "46px"}}>
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                    <button className="btn"
                    style={{border: "1px solid black"}} onClick={handleGoBackToCoursePage}>
                        <ImBooks/> Courses
                    </button>
                </div>
                

                <div className="">
                    <ul className="planner_item_list d-flex flex-row list-unstyled mx-auto mb-0">
                        {
                            configMap.map((entry,idx) => (
                                <li className={`planner_itm mx-3 py-1 ${activeSection === idx ? "active" : ""}`}
                                    style={{
                                        cursor: "pointer",
                                        display: `${(
                                                (entry.restricted === false || entry.restricted === "" || entry.restricted === undefined) 
                                                || 
                                                (entry.restricted === true && subPage === "modules")
                                            ) 
                                            ? "block" : "none"}`
                                        }}
                                    onClick={() => setActiveSection(idx)} key={idx}
                                >
                                    {entry.icon} {entry.header}
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className="d-flex align-items-center">
                    <div className="">
                        <span className="btn btn-outline-primary" onClick={handlePreviewData}>
                            {IconSetting(<BsShareFill/>, "", "", "me-1")}     
                            Share
                        </span>
                    </div> 
                </div>
            </div>
            
        </div>
    )
}

export default CoursePlannerHeader