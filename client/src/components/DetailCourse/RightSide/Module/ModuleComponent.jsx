import React, { useEffect, useState } from 'react'
import {IoAdd, IoClose} from 'react-icons/io5'

import {RiDeleteBin6Line} from 'react-icons/ri'
import {AiOutlineLink} from 'react-icons/ai'
import { IconSetting } from '../../../../utils/IconSetting'

import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

const ModulesComponent = () => {
  const {course} = useSelector(state => state.course)
  
  const [moduleList, setModuleList] = useState([])

  useEffect(() => {
    setModuleList((course.moduleList && course.moduleList.length > 5) ? course.moduleList : [
      {
        id: "1",
        name: "Introduction",
      },
      {
        id: "2",
        name: "Indexing",
      },
      {
        id: "3",
        name: "Partitioning",
      },
      {
        id: "4",
        name: "Query Optimization",
      },
      {
        id: "5",
        name: "Database Security",
      },
      {
        id: "6",
        name: "Transaction and Concurrency Management",
      },
      {
        id: "7",
        name: "View & Stored Procedures",
      },
      {
        id: "8",
        name: "Functions & Triggers",
      },
      {
        id: "9",
        name: "NoSQL Basics",
      },
      {
        id: "10",
        name: "NoSQL Data Model",
      },
    ])
  }, [course.moduleList])


  const [popUpStat, setPopUpStat] = useState(false)
  const [moduleName, setModuleName] = useState('')

  const handleSubmitForm = (e) => {
    e.preventDefault()
    setModuleList((prevItm) => prevItm.concat(moduleName))

    setPopUpStat(false)
  }

  const handleDeleteModule = (idx) => {
    if (idx >= 0 && idx < moduleList.length) {
      const updatedList = [...moduleList];
      updatedList.splice(idx, 1);
      setModuleList(updatedList);
      console.log("Item deleted successfully.");
    } else {
      console.log("Invalid index. No item deleted.");
    }
  }


  
  return (
    <div className="module_component ms-4 me-4">
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={() => setPopUpStat(true)}><IoAdd /> Module</button>
      </div>

      <div className="module_table mt-2">
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="week_col">Week No.</th>
              <th scope="col" className="module_col">Module</th>
              <th scope="col" className="action_col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              moduleList.map((moduleItm, idx) => (
                <tr className="fw-normal" key={moduleItm.id}>
                  <th scope="row">{idx + 1}</th>
                  <td> <Link to="/course/01/planner/02">{moduleItm.name}</Link></td>
                  <td>
                    <span className="me-4" onClick={() => handleDeleteModule(idx)}>{IconSetting(<RiDeleteBin6Line/>,"red")}</span>
                    <span>{IconSetting(<AiOutlineLink/>)}</span>
                  </td>
                </tr>
              ))
            }
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