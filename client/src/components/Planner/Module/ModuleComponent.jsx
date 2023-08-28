import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
// Import Icons
import {AiFillFolder} from 'react-icons/ai'
import {ImBin2} from 'react-icons/im'

import { IconSetting } from '../../../utils/IconSetting'
import { deleteModule, getModuleInfo, resetModuleState } from '../../../redux/slices/moduleSlice'
import { Fragment, useEffect } from 'react'
import { toast } from 'react-toastify'



const ModuleComponent = ({courseID, setPopUpStat, setFormName}) => {
    const {courseCode, courseName} = useSelector(state => state.course.course)
    const {moduleList, isCreated, isDeleted, isError, message} = useSelector(state => state.module)
    const {accessToken} = useSelector(state => state.auth.token)
    const dispatch = useDispatch()

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

    useEffect(() => {
        if (isCreated) {
            toast.success("Create module Successfully");
            dispatch(resetModuleState());
        }
        if(isDeleted) {
            toast.success("Delete module Successfully");
            if (moduleList.length > 0) {
                handleSelectModule(moduleList[0].id)
            } else {
                navigate(`/courses/${courseID}`)
            }
            dispatch(resetModuleState());

        } else if(isError) {
            toast.error(message);
            dispatch(resetModuleState());
        }

    }, [dispatch, isCreated, isDeleted, isError, message, moduleList])

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
                        <Fragment></Fragment>
                    }
                </div>
            </div>
        </div>
    )
}

export default ModuleComponent