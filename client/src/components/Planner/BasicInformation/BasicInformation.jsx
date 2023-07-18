import React, { useEffect, useState } from 'react'
import {AiOutlineQuestionCircle} from 'react-icons/ai'
import TextEditor from '../../TextEditor/TextEditor'

const BasicInformation = () => {
    const initialState = {
        moduleName: "",
        moduleClos: "",
        sessions: [
            {
                sessionName: "Pre-class",
                sessionModality: "F2F",            //  F2F, Online, Hybrid
                grouping: "Individual",                   //  Individual, Class
                lectureAvailability: "Yes",         //  Yes, no
                asyncSync: "Synchronous"
            },
            {
                sessionName: "In-class",
                sessionModality: "F2F",            //  F2F, Online, Hybrid
                grouping: "Individual",                   //  Individual, Class
                lectureAvailability: "Yes",         //  Yes, no
                asyncSync: "Synchronous"
            },
            {
                sessionName: "Post-class",
                sessionModality: "F2F",            //  F2F, Online, Hybrid
                grouping: "Individual",                   //  Individual, Class
                lectureAvailability: "Yes",         //  Yes, no
                asyncSync: "Synchronous"
            },
        ]
    }
    const [moduleInfo, setModuleInfo] = useState(initialState)
    const {moduleName, moduleClos} = moduleInfo

    useEffect(() => {
        const fetchData = () => {
          // Replace this with your actual API call
            setTimeout(() => {
                const apiData = {
                    moduleName: "Introduction",
                    moduleClos: "<p>Hello World From Introduction!</p>",
                    sessions: [
                        {
                            sessionName: "Pre-class",
                            sessionModality: "F2F",            
                            grouping: "Individual",
                            lectureAvailability: "No",
                            asyncSync: "Synchronous"         
                        },
                        {
                            sessionName: "In-class",
                            sessionModality: "Online",         
                            grouping: "Class",                  
                            lectureAvailability: "Yes",
                            asyncSync: "Synchronous"        
                        },
                        {
                            sessionName: "Post-class",
                            sessionModality: "Hybrid",      
                            grouping: "Individual",                   
                            lectureAvailability: "No",
                            asyncSync: "Synchronous"
                        },
                    ]
                };
                setModuleInfo(apiData);
            }, 1000); // Delay of 1 second for demonstration purposes
        };
    
        fetchData();
    }, [])

    const handleChangeInput = (e) => {
        const {name, value} = e.target

        setModuleInfo((prevState) => ({...prevState, [name]: value}))
    }

    const handleOptionChange = (sessionName, key, value) => {
        setModuleInfo((prevState) => ({
            ...prevState,
            sessions: prevState.sessions.map((session) =>
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

                    <label className="form-check-label"> {option} </label>
                </div>
              ))}
            </div>
        );
    }
    return (
        <div className="module_info_wrapper p-4">
            <form onSubmit={handleeSaveInfo}>
                <div className="mb-3">
                    <div className="d-flex justify-content-between">
                        <label htmlFor="moduleNameInput" className="form-label">Module Name</label>
                        <small>Edit</small>
                    </div>
                    <input type="text" className="form-control" id="moduleNameInput" name='moduleName' value={moduleName} onChange={handleChangeInput} />
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
                            moduleInfo.sessions.map((classItm, idx) => (
                                <tr className="fw-normal" key={idx}>
                                    <td className="text-center p-2">{classItm.sessionName}</td>
                                    <td>
                                        <RadioButtonsList
                                            className={"d-flex justify-content-evenly"}
                                            options={['F2F', 'Online', 'Hybrid']}
                                            selectedOption={classItm.sessionModality}
                                            onChange={(event) =>handleOptionChange(classItm.sessionName, 'sessionModality', event.target.value)}
                                        />
                                    </td>

                                    <td>
                                        <RadioButtonsList
                                            className={"d-flex justify-content-evenly"}
                                            options={['Individual', 'Class']}
                                            selectedOption={classItm.grouping}
                                            onChange={(event) => handleOptionChange(classItm.sessionName, 'grouping', event.target.value)}
                                        />
                                    </td>

                                    <td>
                                        <RadioButtonsList
                                            className={"d-flex justify-content-evenly"}
                                            options={['Yes', 'No']}
                                            selectedOption={classItm.lectureAvailability}
                                            onChange={(event) => handleOptionChange(classItm.sessionName, 'lectureAvailability', event.target.value)}
                                        />
                                    </td>

                                    <td>
                                        <RadioButtonsList
                                            className={"d-flex flex-column justify-content-evenly"}
                                            options={['Asynchronous', 'Synchronous']}
                                            selectedOption={classItm.asyncSync}
                                            onChange={(event) => handleOptionChange(classItm.sessionName, 'lectureAvailability', event.target.value)}
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
                    <TextEditor value={moduleClos} onSendValue={handleTextEditor} />
                </div>
                
            </form>
        </div>
    )
}

export default BasicInformation