import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import {AiOutlineQuestionCircle} from 'react-icons/ai'
import TextEditor from '../../TextEditor/TextEditor'
import { useDispatch, useSelector } from 'react-redux';
import { editModule, resetModuleState } from '../../../redux/slices/moduleSlice';
import { toast } from 'react-toastify';


const ModuleInfo = ({width}) => {
    const initialState = {
        name: "",
        los: "",
        sessionList: [
            {
                id: "",
                sessionName: "Pre_class",
                sessionOption: "F2F",               //  F2F, Online, Hybrid
                groupingType: "Individual",         //  Individual, Class
                hasLecturer: true,                  //  Yes, no
                interactionType: "Synchronous"
            },
            {
                id: "",
                sessionName: "In_class",
                sessionOption: "F2F",               //  F2F, Online, Hybrid
                groupingType: "Individual",         //  Individual, Class
                hasLecturer: true,                  //  Yes, no
                interactionType: "Synchronous"
            },
            {
                id: "",
                sessionName: "Post_class",          //  Pre_class, In_class, Post_class
                sessionOption: "F2F",               //  F2F, Online, Hybrid
                groupingType: "Individual",         //  Individual, Class
                hasLecturer: true,                  //  Yes, no
                interactionType: "Asynchronous"     //   Synchronous, Asynchronous
            },
        ]
    };

    const {accessToken} = useSelector(state => state.auth.token)
    const {moduleItem, isEdited, isError, message} = useSelector(state => state.module)

    const dispatch = useDispatch()

    const {subId} = useParams();

    const [moduleInfo, setModuleInfo] = useState(initialState);
    const {name, los} = moduleInfo;

    const getModuleData = (data) => {
        const sessionListMap = data?.sessionList?.map(session => ({
            id: session.id,
            sessionName: session.sessionName,
            sessionOption: session.sessionOption,
            groupingType: session.groupingType,
            hasLecturer: session.hasLecturer,
            interactionType: session.interactionType
        }))

        let desiredOrder = ['Pre_class', 'In_class', 'Post_class'];

        // Reorder the sessions based on the desired order
        let reorderedSessions = desiredOrder.map(sessionName => {
            const session = sessionListMap?.find(session => session.sessionName === sessionName);
            return session !== undefined ? session : null; // Return null for undefined sessions
        });

        return {
            name: data?.name,
            los: data?.los === null ? "" : data?.los,
            sessionList: reorderedSessions
        }
    }

    useEffect(() => {
        const moduleData = getModuleData(moduleItem);
        setModuleInfo(moduleData)
    }, [moduleItem])
        

    const handleChangeInput = (e) => {
        const {name, value} = e.target

        setModuleInfo((prevState) => ({...prevState, [name]: value}))
    }

    const handleOptionChange = (sessionName, key, value) => {
        setModuleInfo((prevState) => ({
            ...prevState,
            sessionList: prevState.sessionList.map((session) =>
                session.sessionName === sessionName ? { ...session, [key]: value } : session
            ),
        }));
    };

    const handleTextEditor = (value) => {
        setModuleInfo((prevState) => ({ ...prevState, los: value }));
    };


    const handleeSaveInfo = (e) => {
        e.preventDefault()
        dispatch(editModule({moduleData: moduleInfo, id: subId, token: accessToken}))
    }

    useEffect(() => {
        if(isEdited) {
            toast.success(`Edit Module "${moduleItem.name}" Successfully`)
            dispatch(resetModuleState())
        } else if(isError) {
            toast.error(message)
            dispatch(resetModuleState())
        }
    }, [dispatch, isEdited, isError, message, moduleItem.name])


    const RadioButtonsList = ({ className, options, selectedOption, onChange }) => {
        return (
            <div className={className}>
              {options.map((option, idx) => (
                <div className="form-check" key={idx}>
                    <input className="form-check-input"
                        type="radio" 
                        value={option}
                        checked={selectedOption === option}
                        onChange={onChange}
                    />

                    <label className="form-check-label">
                        {option === true ? "Yes" : option === false ? "No" : option}
                    </label>
                </div>
              ))}
            </div>
        );
    }
    return (
        <div className="module_info_wrapper p-4" style={{width: `${width}%`}}>
            <form onSubmit={handleeSaveInfo}>
                <div className="mb-3">
                    <div className="d-flex justify-content-between">
                        <label htmlFor="moduleNameInput" className="form-label">Module Name</label>
                        <small>Edit</small>
                    </div>
                    <input type="text" className="form-control" id="moduleNameInput" name='name' value={name} onChange={handleChangeInput} />
                </div>

                
                <div className="class_info mb-3">
                    <table className="class_table table ">
                        <thead>
                            <tr>
                            <th scope="col" className="class_col p-2">Class Name</th>
                            <th scope="col" className="modality_col p-2">Modality</th>
                            <th scope="col" className="grouping_col p-2">Grouping</th>
                            <th scope="col" className="availability_col p-2">Lecture Availability</th>
                            <th scope="col" className="async_sync_col p-2">Async/Sync</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                            moduleInfo.sessionList.map((classItm, idx) => (
                                <tr className="fw-normal" key={idx}>
                                    <td className="text-center p-2">{classItm.sessionName}</td>
                                    <td>
                                        <RadioButtonsList
                                            className={"d-flex justify-content-evenly"}
                                            options={['F2F', 'Online', 'Hybrid']}
                                            selectedOption={classItm.sessionOption}
                                            onChange={(event) =>handleOptionChange(classItm.sessionName, 'sessionOption', event.target.value)}
                                        />
                                    </td>

                                    <td>
                                        <RadioButtonsList
                                            className={"d-flex justify-content-evenly"}
                                            options={['Individual', 'Class']}
                                            selectedOption={classItm.groupingType}
                                            onChange={(event) => handleOptionChange(classItm.sessionName, 'groupingType', event.target.value)}
                                        />
                                    </td>

                                    <td>
                                        <RadioButtonsList
                                            className={"d-flex justify-content-evenly"}
                                            options={[true, false]}
                                            selectedOption={classItm.hasLecturer}
                                            onChange={(event) => handleOptionChange(classItm.sessionName, 'hasLecture', event.target.value)}
                                        />
                                    </td>

                                    <td>
                                        <RadioButtonsList
                                            className={"d-flex flex-column justify-content-evenly"}
                                            options={['Asynchronous', 'Synchronous']}
                                            selectedOption={classItm.interactionType}
                                            onChange={(event) => handleOptionChange(classItm.sessionName, 'interactionType', event.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
                

                <div className="mb-3">
                    <div className="">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label me-4">Module Learning Object</label>
                        <AiOutlineQuestionCircle />
                    </div>
                    <TextEditor value={los} onSendValue={handleTextEditor} />
                </div>

                <div className="submit_btn">
                    <div className="mt-3 d-flex justify-content-between">
                        <span className="btn btn-primary w-25" onClick={() => setModuleInfo(getModuleData(moduleItem))}>Cancel</span>
                        <button className="btn btn-success w-25" type='submit'>Save</button>
                    </div>
                </div>
                
            </form>
        </div>
    )
}

export default ModuleInfo