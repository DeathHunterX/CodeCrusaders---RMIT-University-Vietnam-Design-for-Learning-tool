import React from 'react'

import {RiDeleteBin5Fill} from 'react-icons/ri'
import { ActivityCardList } from '../Map/ActivityCardList';

const ActivityCard02 = ({id, index, itemId, moveCard, createCardByIdx}) => {
    const filter = ActivityCardList.filter((activity) => id === activity.activityID)
    
    return (
        <li> 
            <div className="class_activity" style={{height: '100px', position:'relative'}}>
                <div className="activity_card mb-3" style={{userSelect: 'none', boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}}>
                    <div className="activity_symbols" style={{backgroundColor: `${filter[0].activityIconBg}`}}>
                        {filter[0].activityIcon}
                    </div>
                    <div className="activity_content">
                        <div className="content_body">
                            <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <h5 className="activity_name">{filter[0].activityName}</h5>
                                <small className="ms-3">(Click here to edit)</small>
                            </div>
                            <div className="">
                                <RiDeleteBin5Fill />
                            </div>
                            </div>
                            {/* <p className="activity_desc">{data.activityDescription}</p>      */}
                        </div>
                    </div>
                </div>
                
            </div>
        </li>
    )
}

export default ActivityCard02