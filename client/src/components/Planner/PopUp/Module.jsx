import React from 'react'
import { IoClose } from 'react-icons/io5'

const Module = ({compData, compFunction}) => {
    const {popUpStat, moduleData} = compData
    const {handleSubmitForm, handleClosePopUp, handleChangeInput} = compFunction
    return (
        <div className="form_content" style={{display: popUpStat.formName === "module" ? "block" : "none"}}>
            <form onSubmit={handleSubmitForm}>
                <div className="form_header mb-4">
                    <div className=" d-flex justify-content-between">
                        <p>Add Module</p>
                        <span style={{cursor: 'pointer'}}><IoClose onClick={handleClosePopUp}/></span>
                    </div>
                    <hr/>
                </div>

                <div className="mb-4">
                    <input type="text" className="form-control" 
                        id="inputModuleName" 
                        aria-describedby="inputModuleName" 
                        name="moduleName" 
                        value={moduleData.moduleName}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="form_bottom d-flex justify-content-end">
                    <span className="btn" onClick={handleClosePopUp}>Cancel</span>
                    <button className="btn btn-outline-primary ms-2">Add Module</button>
                </div>
            </form>
        </div>
    )
}

export default Module