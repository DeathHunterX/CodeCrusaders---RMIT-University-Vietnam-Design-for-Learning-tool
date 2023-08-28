import { useEffect } from 'react'
import Download from '../../components/DownloadPDF/Download'
import { useDispatch, useSelector } from 'react-redux';
import { getDataFromLinkSharing } from '../../redux/slices/sharingSlice';
import { useParams } from 'react-router-dom';

const PlanningContentPage = () => {
  const {id} = useParams();
  const {accessToken} = useSelector(state => state.auth.token);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getDataFromLinkSharing({sharedID: id, token: accessToken}))
  }, [accessToken, dispatch, id])
  
  return (
    <Download />
  )
}

export default PlanningContentPage