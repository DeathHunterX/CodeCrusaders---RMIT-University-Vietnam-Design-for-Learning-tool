import React, { useEffect } from 'react'
import PlannerComponent from '../../../../components/Planner/PlannerComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getCourse } from '../../../../redux/slices/courseSlice';
import { getModuleInfo, getModules } from '../../../../redux/slices/moduleSlice';
import { useParams } from 'react-router-dom';
import { getSessions } from '../../../../redux/slices/sessionSlice';

const ModulePage = () => {
  const {accessToken} = useSelector(state => state.auth.token)
  const {moduleItem} = useSelector(state => state.module)

  const dispatch = useDispatch();

  const {id, subId} = useParams();

  useEffect(() => {
    dispatch(getSessions({moduleID: subId, token: accessToken}))
  }, [accessToken, dispatch, moduleItem, subId])

  // Get Course
  useEffect(() => {
    dispatch(getCourse({id: id, token: accessToken}))
  }, [accessToken, dispatch, id])

  // Get All Modules
  useEffect(() => {
      dispatch(getModules({id: id, token: accessToken}))
  }, [accessToken, dispatch, id])


  // Get Module
  useEffect(() => {
    if (Object.keys(moduleItem).length === 0){
      dispatch(getModuleInfo({id: subId, token: accessToken}))   
    }
  }, [accessToken, dispatch, moduleItem, subId])

  return (
    <PlannerComponent/>
  )
}

export default ModulePage