import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// Import Icons
import {AiFillFolder} from 'react-icons/ai'
import {HiOutlineDotsVertical} from 'react-icons/hi'

import { IconSetting } from '../../../utils/IconSetting'
import { getModuleInfo } from '../../../redux/slices/moduleSlice'



const ModuleComponent = ({courseID, dispatch, setPopUpStat}) => {
    const {courseCode, courseName} = useSelector(state => state.course.course)
    const {moduleList} = useSelector(state => state.module)
    const {accessToken} = useSelector(state => state.auth.token)

    const navigate = useNavigate()

    const handleSelectModule = (moduleID) => {
        dispatch(getModuleInfo({id: moduleID , token: accessToken}))
        return navigate(`/courses/${courseID}/modules/${moduleID}`)
    }

    return (
        <div className="module_wrapper w-100">
            <div className="module_create_btn mx-3 my-2">
                <button className="btn btn-primary w-100" onClick={() => setPopUpStat(prevState => !prevState)}>Create Module</button>
            </div>
            <div className="module_container d-flex flex-column p-2">
                <div className="course_title d-flex" style={{alignItems:"baseline"}}>
                    <div className="">
                        <AiFillFolder/>
                    </div>
                    <div className="ps-2" style={{lineHeight: "1", whiteSpace:"break-spaces"}}>
                        <span style={{fontSize: "14px"}}>{courseCode} - {courseName}</span>
                    </div>
                </div>
                <div className="module_list">
                    <div className="module_item d-flex my-3">
                        <div className="d-flex justify-content-between w-100 ps-2">
                            <div className="">
                                <span className="text-capitalize">Topic 01: Introduction</span>
                            </div>
                            <div className="px-2">
                                {IconSetting(<HiOutlineDotsVertical/>, 'black', '14px')}
                            </div>
                        </div>
                    </div>

                    {
                    moduleList?.length > 0 
                    ?
                        moduleList?.map((moduleItm) => {
                            return (
                                <div className="module_item d-flex my-3" key={moduleItm.id}
                                onClick={() => handleSelectModule(moduleItm.id)}>
                                    <div className="d-flex justify-content-between w-100 ps-2">
                                        <div className="">
                                            <span className="text-capitalize">Topic 01: {moduleItm.name}</span>
                                        </div>
                                        <div className="px-2">
                                            {IconSetting(<HiOutlineDotsVertical/>, 'black', '14px')}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    :
                        <></>
                    }
                </div>
                
                <div className=""></div>
            </div>
        </div>
    )
}

export default ModuleComponent