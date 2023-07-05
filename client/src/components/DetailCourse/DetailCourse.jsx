import React from 'react'
import LeftSide from './LeftSide/LeftSide'
import {Link} from 'react-router-dom'

import RightSide from './RightSide/RightSide'

const DetailCourse = () => {
  return (
    <div className="detail_course">
        <div className="detail_course_header ps-4 pt-3 pb-3"> 
            <h5>
                <div aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="">BP306</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Home</li>
                    </ol>
                </div>
            </h5>
        </div>
        <div className="detail_course_body d-flex flex-wrap">
            <div className="left_side course_sidebar col-1">
                 <LeftSide />
            </div>

            <div className="right_side col-11">
                <RightSide />
            </div>
        </div>
        
    </div>
  )
}

export default DetailCourse