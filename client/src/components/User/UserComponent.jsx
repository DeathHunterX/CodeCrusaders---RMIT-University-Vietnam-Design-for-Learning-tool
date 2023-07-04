import React from 'react'
import LeftSide from './LeftSide/LeftSide'
import RightSide from './RightSide/RightSide'

const UserComponent = () => {
  return (
    <div className="detail_course">
        <div className="detail_course_body d-flex flex-wrap mt-4">
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

export default UserComponent