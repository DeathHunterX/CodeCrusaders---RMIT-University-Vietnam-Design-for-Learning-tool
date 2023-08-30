import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDataFromLinkSharing, getIdFromLinkSharing } from '../../redux/slices/sharingSlice';
import { useParams } from 'react-router-dom';
import PlanningContentComponent from '../../components/PlanningContent/PlanningContentComponent';
import { getComment } from '../../redux/slices/commentSlice';

const PlanningContentPage = () => {
  const {id} = useParams();
  const {accessToken} = useSelector(state => state.auth.token);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getDataFromLinkSharing({sharedID: id, token: accessToken}))
  }, [accessToken, dispatch, id])

  useEffect(() => {
    dispatch(getIdFromLinkSharing({sharedID: id, token: accessToken}))
  }, [accessToken, dispatch, id])


  useEffect(() => {
    dispatch(getComment({sharingID: id, token: accessToken}))
  }, [accessToken, dispatch, id])
  
  return (
    <PlanningContentComponent />
  )
}

export default PlanningContentPage