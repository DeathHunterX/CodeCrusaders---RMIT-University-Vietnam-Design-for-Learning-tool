import React from 'react'


const ActivityCard = ({id, index, data, moveCard}) => {
    
    return (
        <li> 
            <div className="class_activity" style={{height: '100px', position:'relative'}}>
                <div className="activity_card mb-3" style={{userSelect: 'none'}}>
                    <div className="activity_symbols" style={{backgroundColor: `${data.activityIconBg}`}}>
                        {data.activityIcon}
                    </div>
                    <div className="activity_content">
                        <div className="content_body">
                            <h5 className="activity_name">{data.activityName}</h5>
                            <p className="activity_desc">{data.activityDescription}</p>     
                        </div>
                    </div>
                </div>
                
            </div>
        </li>
    )
}

export default ActivityCard