import React, { useEffect, useState } from 'react'
import {AiOutlineEdit} from "react-icons/ai"
import {useParams} from "react-router-dom"
import { IconSetting } from '../../../utils/IconSetting';
import { MdOutlineCheckCircleOutline, MdOutlineRemoveCircleOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { resetSessionState, updateSessionDuration } from '../../../redux/slices/sessionSlice';
import {toast} from "react-toastify"

const ModuleCard = ({ title, sessionID, number, numberDuration, totalDuration, setActivitiesData }) => {
  const {accessToken} = useSelector(state => state.auth.token)
  const {isDurationUpdated, isError, message} = useSelector(state => state.session)

  const [durationEdited, setDurationEdited] = useState(false);
  const [duration, setDuration] = useState(totalDuration);

  const {subId} = useParams();

  const dispatch = useDispatch();

  const handleChangeDuration = () => {
    if (duration !== totalDuration) {
      dispatch(updateSessionDuration({moduleID: subId, sessionID: sessionID, durationData: {totalDuration: duration}, token: accessToken}))
    }
    setDurationEdited((state) => !state)
  }

  useEffect(() => {
    if(isDurationUpdated) {
      setActivitiesData(prevData => prevData.map(obj => {
          if(obj.id === sessionID) {
              return {
                  ...obj,
                  totalDuration: duration
              }
          }
          return obj;
        }
      ))
      dispatch(resetSessionState())
    } else if(isError) {
      toast.error(message);
      dispatch(resetSessionState())
    }
  }, [dispatch, duration, isDurationUpdated, isError, message, sessionID, setActivitiesData])
  
  const handleOpenCancelDurationChanged = () => {
    setDurationEdited((state) => !state)
    setDuration(totalDuration)
  }


  return (
    <div className="module-card">
      <h4>{title}</h4>
      <table className="table m-0">
        <thead style={{verticalAlign: "middle"}}>
          <tr>
            <th scope="col">Number of Activity:</th>
            <th scope="col">Duration:</th>
            <th scope="col">Class Duration:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{number}</td>
            <td>{numberDuration} mins</td>
            {
              durationEdited ? (
                  <td className="position-relative d-flex justify-content-center">
                    <input type="number" className="form-control w-75" id="inputDurationTime" aria-describedby="inputDurationTime"
                    min={0} max={320} value={duration}
                    onChange={e => setDuration(e.target.value)}/>
                    <div className="position-absolute d-flex justify-content-between align-items-center"
                    style={{top: "40px", left: "15px"}}>
                      <button className='btn' onClick={handleChangeDuration}>{IconSetting(<MdOutlineCheckCircleOutline/>, 'green')}</button>
                      <button className='btn' onClick={handleOpenCancelDurationChanged}>{IconSetting(<MdOutlineRemoveCircleOutline/>, 'red')}</button> 
                    </div>
                  </td>
                )
                :
                (
                  <td>{totalDuration} mins</td>
                )
            }
            
          </tr>
        </tbody>
      </table>
      <div className="edit_total_duration" onClick={handleOpenCancelDurationChanged}>
        <span><AiOutlineEdit/></span>
      </div>
    </div>
  );
};

export default ModuleCard;