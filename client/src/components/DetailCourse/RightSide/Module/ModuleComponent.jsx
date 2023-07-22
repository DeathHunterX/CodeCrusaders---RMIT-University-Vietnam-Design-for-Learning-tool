import React, { useEffect, useState } from 'react'
import {IoAdd, IoClose} from 'react-icons/io5'

import {RiDeleteBin6Line} from 'react-icons/ri'
import {AiOutlineLink} from 'react-icons/ai'
import { IconSetting } from '../../../../utils/IconSetting'

import { Link, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { createModule, deleteModule, getModules} from '../../../../redux/slices/moduleSlice'
// import { ModuleFakeData } from './ModuleFakeData'

const ModulesComponent = () => {
  const {type, token} = useSelector(state => state.auth.user)
  // const {course} = useSelector(state => state.course)
  const {moduleList, isSuccess} = useSelector(state => state.module)

  const combinedToken = `${type} ${token}`
  const dispatch = useDispatch()

  const [popUpStat, setPopUpStat] = useState(false)
  const [moduleData, setModuleData] = useState({moduleName: ""})

  const {id} = useParams()

  useEffect(() => {
    dispatch(getModules({id: id, token: combinedToken}))
  }, [combinedToken, dispatch, id])


  const handleChangeInput = (e) => {
    const {name, value} = e.target
    setModuleData(prevState => ({...prevState, [name]: value}))
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    dispatch(createModule({moduleData: moduleData, id: id, token: combinedToken}))

    setPopUpStat(false)
  }

  const handleDeleteModule = (id) => {
    dispatch(deleteModule({id: id, token: combinedToken}))
  }


  
  return (
    <div className="module_component ms-4 me-4">
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={() => setPopUpStat(true)}><IoAdd /> Module</button>
      </div>

      <div className="module_table mt-2">
        {
          moduleList.message ? 
          <div>
            <h1>{moduleList.message}</h1>
          </div>
          :  
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
                    <td> <Link to={`/course/${id}/planner/${moduleItm.id}`}>{moduleItm.name}</Link></td>
                    <td>
                      <span className="me-4" 
                      style={{cursor: "pointer"}}
                      onClick={() => handleDeleteModule(moduleItm.id)}
                      >
                        {IconSetting(<RiDeleteBin6Line/>,"red")}
                      </span>
                      <span>{IconSetting(<AiOutlineLink/>)}</span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        }
        
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
              {/* <label htmlFor="inputModuleName">Module Name</label> */}
              <input type="text" className="form-control" id="inputModuleName" aria-describedby="inputModuleName" name="moduleName" onChange={handleChangeInput}/>
            </div>

            {/* <div className="mb-4">
              <label htmlFor="inputModuleName">Module Name</label>
              <select name="moduleWeek" className="form-select" value={} onChange={}></select>
            </div> */}

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