import React from 'react'
import ResizableBox from '../ResizableBox/ResizableBox'
import {Droppable, Draggable} from '@hello-pangea/dnd' 

const PlannerDescription = ({items, onDragEnd}) => {
  
  return (
    <div className="d-flex">
      <div className="col-9">
        <Droppable droppableId="right_board">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} style={{listStyle: 'none', paddingLeft: '0'}}>
              {items.map((activity_itm, idx) => (
                  <Draggable key={activity_itm.activityID} draggableId={activity_itm.activityID} index={idx}>
                      {(provided) => (
                          <li {...provided.draggableProps} {...provided.dragHandleProps}  ref={provided.innerRef}
                          >
                              {/* <div className="activity_dnd_item" key={idx}> */}
                              <div className="class_activity" style={{height: '100px'}}>

                                  <div className="activity_card mb-3">
                                      <div className="activity_symbols" style={{backgroundColor: `${activity_itm.activityIconBg}`}}>
                                          {activity_itm.activityIcon}
                                      </div>
                                      <div className="activity_content">
                                          <div className="content_body">
                                              <h5 className="activity_name">{activity_itm.activityName}</h5>
                                              <p className="activity_desc">{activity_itm.activityDescription}</p>     
                                          </div>
                                      </div>
                                  </div>
                                  
                              </div>
                              {/* </div> */}
                          </li>
                      )}
                      
                  </Draggable>
              ))}
              {provided.placeholder}
          </ul>
      )}
        </Droppable>
      </div>

      <div className="col-3">
        <ResizableBox/>
      </div>
    </div>
  )
}

export default PlannerDescription