import React from 'react'
import { useParams } from 'react-router-dom';

import ModulesComponent from './ModuleComponent';
import HomeComponent from './HomeComponent';

const RightSide = () => {
  const {subPage} = useParams()
  switch (subPage) {
    case "modules" :
      return(<ModulesComponent />)
  
    default:
      return(<HomeComponent />)
  }
}

export default RightSide