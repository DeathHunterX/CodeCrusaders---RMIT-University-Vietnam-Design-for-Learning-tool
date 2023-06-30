import React from 'react'
import { useParams } from 'react-router-dom';

import ModulesComponent from './Module/ModuleComponent';
import HomeComponent from './Home/HomeComponent';
import SettingComponent from './Setting/SettingComponent';

const RightSide = () => {
  const {subPage} = useParams()
  switch (subPage) {
    case "modules" :
      return(<ModulesComponent />)
    case "setting" :
      return(<SettingComponent />)
  
    default:
      return(<HomeComponent />)
  }
}

export default RightSide