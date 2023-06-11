import React, { useState } from 'react'
import {IoAdd, IoClose} from 'react-icons/io5'

import { Link } from 'react-router-dom'
const ModulesComponent = () => {
  const [popUpStat, setPopUpStat] = useState(false)
  const [moduleName, setModuleName] = useState('')

  const handleSubmitForm = (e) => {
    e.preventDefault()
    console.log(moduleName)

    setPopUpStat(false)
  }
  return (
    <div className="module_component">
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={() => setPopUpStat(true)}><IoAdd /> Module</button>
      </div>

      <div className="module_table">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Module</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td> <Link to="/course/01/planner/02">Intro to Capstone Project</Link></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={`popup_form ${popUpStat === true ? 'active' : ''}`}>
        <div className="overlay"></div>
        <div className="form_content">
          <form onSubmit={handleSubmitForm}>
            <div className="form_header mb-4">
              <div className=" d-flex justify-content-between">
                <p>Add Module</p>
                <span style={{cursor: 'pointer'}}><IoClose onClick={() => setPopUpStat(false)}/></span>
              </div>
              <hr/>
            </div>
            
            <div className="mb-4">
              <input type="text" className="form-control" id="inputModuleText" aria-describedby="inputModuleText" onChange={e => setModuleName(e.target.value)}/>
            </div>

            <div className="form_bottom d-flex justify-content-end">
              <span className="btn" onClick={() => setPopUpStat(false)}>Cancel</span>
              <button className="btn btn-outline-primary ms-2">Add Module</button>
            </div>
          </form>
        </div>
        
      </div>
      
    </div>
  )
}

export default ModulesComponent