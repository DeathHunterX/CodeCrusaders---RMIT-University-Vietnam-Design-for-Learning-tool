import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
// Import Icons
import {AiFillFolder} from 'react-icons/ai'
import {ImBin2} from 'react-icons/im'

import { IconSetting } from '../../../utils/IconSetting'
import { deleteModule, getModuleInfo } from '../../../redux/slices/moduleSlice'



const ModuleComponent = ({courseID, dispatch, setPopUpStat, setFormName}) => {
    const {courseCode, courseName} = useSelector(state => state.course.course)
    const {moduleList} = useSelector(state => state.module)
    const {accessToken} = useSelector(state => state.auth.token)

    const {id, subId} = useParams()

    const navigate = useNavigate()

    const handleSelectModule = (moduleID) => {
        dispatch(getModuleInfo({id: moduleID , token: accessToken}))
        return navigate(`/courses/${courseID}/modules/${moduleID}`)
    }

    const handlePopUpState = () => {
        setPopUpStat(prevState => ({
            ...prevState,
            state: !prevState.state,
            formName: "module"
        }))
    }

    const handleDeleteModule = (moduleId) => {
        dispatch(deleteModule({courseId: id, moduleId: moduleId, token: accessToken}))
    }

    return (
        <div className="module_wrapper w-100">
            <div className="module_create_btn mx-3 my-2">
                <button className="btn btn-primary w-100" onClick={handlePopUpState}>Create Module</button>
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
                    {
                    moduleList?.length > 0 
                    ?
                        moduleList?.map((moduleItm) => {
                            return (
                                <div className="module_item_component d-flex my-3" 
                                style={{cursor: "pointer"}}
                                key={moduleItm.id}
                                onClick={() => handleSelectModule(moduleItm.id)}>
                                    <div className={`module_item_container ${moduleItm.id === subId ? "active" : ""} ps-2 py-1`}>
                                        <div className="">
                                            <span className="text-capitalize">{moduleItm.name}</span>
                                        </div>
                                        <div className="px-2" onClick={() => handleDeleteModule(moduleItm.id)}>
                                            {IconSetting(<ImBin2/>, 'black', '14px')}
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