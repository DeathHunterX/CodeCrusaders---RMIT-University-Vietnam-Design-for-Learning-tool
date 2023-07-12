import React, { useState } from 'react'
import {AiOutlineQuestionCircle} from 'react-icons/ai'
import TextEditor from '../../TextEditor/TextEditor'

const BasicInformation = () => {
    const initialState = {
        moduleName: "",
        moduleClos: "",
        session: [
            {
                sessionName: "Pre-class",
                sessionModality1: "F2F",            //  F2F, Online, Hybrid
                grouping: "",                   //  Individual, Class
                lectureAvailability: ""         //  Yes, no
            },
            {
                sessionName: "In-class",
                sessionModality2: "Online",            //  F2F, Online, Hybrid
                grouping: "",                   //  Individual, Class
                lectureAvailability: ""         //  Yes, no
            },
            {
                sessionName: "Post-class",
                sessionModality3: "Hybrid",            //  F2F, Online, Hybrid
                grouping: "",                   //  Individual, Class
                lectureAvailability: ""         //  Yes, no
            },
        ]
    }
    const [moduleInfo, setModuleInfo] = useState(initialState)
    const {moduleName, moduleClos} = moduleInfo

    console.log(moduleInfo)

    const classList = ["Pre-class", "In-class", "Post-class"]

    const handleChangeInput = (e) => {
        const {name, value} = e.target

        setModuleInfo((prevState) => ({...prevState, [name]: value}))
    }

    const handleChangeOption = (e, session) => {
        const {name, value} = e.target
        setModuleInfo((prevState) => {
            let inputArr = [...moduleInfo.session];
            const existingIndex = inputArr.findIndex((item) => item.sessionName === session);
        
            if (existingIndex !== -1) {
                // Update existing item
                inputArr[existingIndex][name] = value
            }
            console.log(inputArr)
      
            return {
              ...prevState,
              session: inputArr,
            }
        });
    }

    const handleTextEditor = (value) => {
        setModuleInfo((prevState) => ({ ...prevState, moduleClos: value }));
    };

    const handleeSaveInfo = (e) => {
        e.preventDefault()
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
                    <table className="class_table table">
                        <thead>
                            <tr>
                            <th scope="col" className="class_col p-2">Class Name</th>
                            <th scope="col" className="modality_col p-2">Modality</th>
                            <th scope="col" className="grouping_col p-2">Grouping</th>
                            <th scope="col" className="availability_col p-2">Lecture Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            moduleInfo.session.map((classItm, idx) => (
                                <tr className="fw-normal" key={idx}>
                                    <th scope="row" className="p-2">{classItm.sessionName}</th>
                                    <td> 
                                        <div className="d-flex justify-content-evenly">
                                            <div className="form-check p-2">
                                                <input className="form-check-input" type="radio" id={`sessionModalityRadio${classItm.sessionName}`} 
                                                name="sessionModality" 
                                                value="F2F"
                                                checked={classItm.sessionModality === "F2F"}
                                                onChange={(e) => handleChangeOption(e, classItm.sessionName)}/>
                                                <label className="form-check-label" htmlFor={`sessionModalityRadio${classItm.sessionName}`}>
                                                    Face-to-face
                                                </label>
                                            </div>
                                            <div className="form-check p-2">
                                                <input className="form-check-input" type="radio" id={`sessionModalityRadio${classItm.sessionName}`} 
                                                name="sessionModality" 
                                                value="Online"
                                                checked={classItm.sessionModality === "Online"}
                                                onChange={(e) => handleChangeOption(e, classItm.sessionName)}/>
                                                <label className="form-check-label" htmlFor={`sessionModalityRadio${classItm.sessionName}`}>
                                                    Online
                                                </label>
                                            </div>
                                            <div className="form-check p-2">
                                                <input className="form-check-input" type="radio" id={`sessionModalityRadio${classItm.sessionName}`} 
                                                name="sessionModality" 
                                                value="Hybrid"
                                                checked={classItm.sessionModality === "Hybrid"}
                                                onChange={(e) => handleChangeOption(e, classItm.sessionName)}/>
                                                <label className="form-check-label" htmlFor={`sessionModalityRadio${classItm.sessionName}`}>
                                                    Hybrid
                                                </label>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="d-flex justify-content-evenly">
                                            <div className="form-check p-2">
                                                <input className="form-check-input" type="radio" name="grouping" id="groupingRadio" />
                                                <label className="form-check-label" htmlFor="grouping">
                                                    Individual
                                                </label>
                                            </div>
                                            <div className="form-check p-2">
                                                <input className="form-check-input" type="radio" name="grouping" id="groupingRadio"  />
                                                <label className="form-check-label" htmlFor="grouping">
                                                    Class
                                                </label>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="d-flex justify-content-evenly">
                                            <div className="form-check p-2">
                                                <input className="form-check-input" type="radio" name="lectureAvailability" id="lectureAvailabilityRadio" />
                                                <label className="form-check-label" htmlFor="lectureAvailability">
                                                    Yes
                                                </label>
                                            </div>
                                            <div className="form-check p-2">
                                                <input className="form-check-input" type="radio" name="lectureAvailability" id="lectureAvailabilityRadio"  />
                                                <label className="form-check-label" htmlFor="lectureAvailability">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
                

                <div className="mb-3">
                    <div className="">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label me-4">Learning Object</label>
                        <AiOutlineQuestionCircle />
                    </div>
                    <TextEditor value={moduleClos} onSendValue={handleTextEditor} />
                </div>
                
            </form>
        </div>
    )
}

export default BasicInformation