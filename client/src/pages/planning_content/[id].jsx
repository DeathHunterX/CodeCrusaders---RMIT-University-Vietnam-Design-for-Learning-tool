import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDataFromLinkSharing } from '../../redux/slices/sharingSlice';
import { useParams } from 'react-router-dom';
import PlanningContentComponent from '../../components/PlanningContent/PlanningContentComponent';

const PlanningContentPage = () => {
  const {id} = useParams();
  const {accessToken} = useSelector(state => state.auth.token);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getDataFromLinkSharing({sharedID: id, token: accessToken}))
  }, [accessToken, dispatch, id])
  
  return (
    <PlanningContentComponent />
  )
}

export default PlanningContentPage