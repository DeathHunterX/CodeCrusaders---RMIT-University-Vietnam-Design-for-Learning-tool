import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { generateLinkSharing, getSharingAddress, resetSharingState } from '../../../redux/slices/sharingSlice'
import { addUpdateSessionState } from '../../../redux/slices/sessionSlice'

import {toast} from 'react-toastify'

import { ImBooks } from "react-icons/im"
import {BsShareFill} from 'react-icons/bs'
import { IconSetting } from '../../../utils/IconSetting'



const CoursePlannerHeader = ({activityData, activityFunction}) => {
    const {setActiveSection, handleGoBackToCoursePage} = activityFunction
    const {subPage, configMap, activeSection, activitiesData} = activityData

    const {accessToken} = useSelector(state => state.auth.token);
    const {moduleItem} = useSelector(state => state.module);
    const {isGenerated, isError, message, linkAddress} = useSelector(state => state.sharing)
    const dispatch = useDispatch()

    const {subId} = useParams();
    const navigate = useNavigate();

    const handlePreviewData = () => {
        if(moduleItem?.shareLink === null || moduleItem?.shareLink === undefined){
            dispatch(generateLinkSharing({moduleID: subId, token: accessToken}))
        }
        else {
            dispatch(getSharingAddress(moduleItem?.shareLink))
        }
    }

    useEffect(() => {
        if(isGenerated || linkAddress){
            navigate(`/planning_content/${linkAddress}`);
            dispatch(resetSharingState());
        } else if (isError) {
            toast.error(message);
            dispatch(resetSharingState());
        }
    } ,[dispatch, isError, isGenerated, linkAddress, message, navigate])

    const handleChangeSection = (idx) => {
        setActiveSection(idx)
        dispatch(addUpdateSessionState(activitiesData))
    }
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
                                    onClick={() => handleChangeSection(idx)} key={idx}
                                >
                                    {entry.icon} {entry.header}
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className="d-flex align-items-center">
                    <div className="">
                        {
                            subPage === "modules" ? 
                            (
                                <span className="btn btn-outline-primary" onClick={handlePreviewData}>
                                    {IconSetting(<BsShareFill/>, "", "", "me-1")}     
                                    Share
                                </span>
                            )
                            :
                            (
                                <div className="share_spacer"> </div>
                            )
                        }
                        
                    </div> 
                </div>
            </div>
            
        </div>
    )
}

export default CoursePlannerHeader