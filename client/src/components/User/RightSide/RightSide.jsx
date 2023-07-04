import React from 'react'
import { useParams } from 'react-router-dom';
import SettingComponent from './Setting/SettingComponent';
import ProfileComponent from './Profile/ProfileComponent';


const RightSide = () => {
  const {subPage} = useParams()
  switch (subPage) {
    case "setting" :
      return(<SettingComponent />)
  
    default:
      return(<ProfileComponent />)
  }
}

export default RightSide