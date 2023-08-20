import { BsFilter } from "react-icons/bs"
import { FaEye } from "react-icons/fa"
import { FaPencil } from "react-icons/fa6"
import { GrPrevious } from "react-icons/gr"

const CoursePlannerHeader = ({activityData, activityFunction}) => {
    const {setActiveSection, handleGoBackToCoursePage, handlePreviewData} = activityFunction
    const {configMap, activeSection} = activityData

    console.log(configMap)
    return (
        <div className="planner_header navbar navbar-expand-lg bg-body-tertiary" style={{height: "46px"}}>
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                    <button className="btn" onClick={handleGoBackToCoursePage}><GrPrevious/></button>
                    <div className="">
                    <div className="d-flex">
                        <h6 className='my-0 me-3'>Introduction</h6>
                        <FaPencil/>
                    </div>
                </div>
                </div>
                

                <div className="">
                    <ul className="planner_item_list d-flex flex-row list-unstyled mx-auto mb-0">
                        {
                            configMap?.map((entry,idx) => (
                                <li className={`planner_itm px-3 py-1 ${activeSection === idx ? "active" : ""}`}
                                    style={{cursor: "pointer"}}
                                    onClick={() => setActiveSection(idx)} key={idx}
                                >{entry.header}</li>
                            ))
                        }
                    </ul>
                </div>

                <div className="d-flex align-items-center">
                    <div className="me-4">
                        <span><BsFilter/> Filter</span>
                    </div>
                    <div className="">
                        <button className="btn btn-primary" onClick={handlePreviewData}><FaEye/> Preview</button>
                    </div> 
                </div>
            </div>
            
        </div>
    )
}

export default CoursePlannerHeader