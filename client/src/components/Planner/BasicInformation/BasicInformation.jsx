import React, { useEffect, useState } from 'react'
import {AiOutlineQuestionCircle} from 'react-icons/ai'
import TextEditor from '../../TextEditor/TextEditor'


const BasicInformation = ({data, width}) => {
    const initialState = {
        name: "",
        los: "",
        sessionList: [
            {
                sessionName: "Pre_class",
                sessionOption: "F2F",               //  F2F, Online, Hybrid
                groupingType: "Individual",         //  Individual, Class
                hasLecture: true,                  //  Yes, no
                interactionType: "Synchronous"
            },
            {
                sessionName: "In_class",
                sessionOption: "F2F",               //  F2F, Online, Hybrid
                groupingType: "Individual",         //  Individual, Class
                hasLecture: true,                  //  Yes, no
                interactionType: "Synchronous"
            },
            {
                sessionName: "Post_class",
                sessionOption: "F2F",               //  F2F, Online, Hybrid
                groupingType: "Individual",         //  Individual, Class
                hasLecture: true,                  //  Yes, no
                interactionType: "Synchronous"
            },
        ]
    };

    const [moduleInfo, setModuleInfo] = useState(initialState);
    const {name, los} = moduleInfo;

    // useEffect(() => {
    //     setModuleInfo({
    //         name: data.name,
    //         los: (data.los === "" || data.los === null) ? "" : data.los,
    //     })
        
    // }, [data.los, data.name, initialState.sessionList])

    const handleChangeInput = (e) => {
        const {name, value} = e.target

        setModuleInfo((prevState) => ({...prevState, [name]: value}))
    }

    const handleOptionChange = (sessionName, key, value) => {
        setModuleInfo((prevState) => ({
            ...prevState,
            sessionList: prevState.sessions.map((session) =>
                session.sessionName === sessionName ? { ...session, [key]: value } : session
            ),
        }));
    };

    const handleTextEditor = (value) => {
        setModuleInfo((prevState) => ({ ...prevState, moduleClos: value }));
    };

    const handleeSaveInfo = (e) => {
        e.preventDefault()
    }

    const RadioButtonsList = ({ className, options, names, selectedOption, onChange }) => {
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

                    <label className="form-check-label"> {option} </label>
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
                                            selectedOption={classItm.hasLecture}
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
                
            </form>
        </div>
    )
}

export default BasicInformation