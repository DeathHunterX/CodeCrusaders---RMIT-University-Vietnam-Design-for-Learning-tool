import React, { useEffect } from 'react'
import PlannerComponent from '../../../components/Planner/PlannerComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCourse } from '../../../redux/slices/courseSlice'
import { getModules } from '../../../redux/slices/moduleSlice'

const CoursePlannerPage = () => {
  const {accessToken} = useSelector(state => state.auth.token)

  const dispatch = useDispatch();

  const {id} = useParams();

  // Get Course
  useEffect(() => {
    dispatch(getCourse({id: id, token: accessToken}))
  }, [accessToken, dispatch, id])

  // Get All Modules
  useEffect(() => {
      dispatch(getModules({id: id, token: accessToken}))
  }, [accessToken, dispatch, id])
  return (
    <PlannerComponent />
  )
}

export default CoursePlannerPage