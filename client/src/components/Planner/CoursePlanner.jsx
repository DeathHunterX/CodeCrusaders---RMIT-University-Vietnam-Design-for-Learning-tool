import React from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

import { IconSetting } from "../../utils/IconSetting";
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ActivityCard from "./Activity/Card/ActivityCard";

import PlannerDescription from "./ModulePlanner/PlannerDescription";

const CoursePlanner = ({activityData, activityFunction}) => {
  const {width2, activitiesData} = activityData
  const {
    openAddEditDialog, 
    setEditedItm, 
  } = activityFunction

  console.log(activitiesData)
  return (
    <React.Fragment>
      <div className="d-flex flex-row" style={{width: `${width2}%`}}>

        {
            activitiesData.map((item) => (
                <div className="activity_list_wrapper" style={{padding: "0 5px"}}>
                    <div className="activity_list_content">
                        <div className="activity_list_header">
                            <h6>{item.sessionName}</h6>
                            <div className="">
                                <span>{IconSetting(<HiOutlineDotsVertical/>, "black", "23px")}</span>
                            </div>
                        </div>
                        
                        <div className="activity_list_body">
                            <Droppable droppableId={`${item.sessionName}_board`}>
                                {(provided) => (
                                    <ul className="activity_list_cards" style={{padding: '10px 0'}}
                                    ref={provided.innerRef} 
                                        {...provided.droppableProps}
                                    >
                                        {item.activityList.map((activity_itm, idx) => {
                                            console.log(activity_itm)
                                            return(   

                                            <Draggable key={activity_itm.id} draggableId={activity_itm.id} index={idx}>
                                                {(provided, snapshot) => (
                                                    <div ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                        opacity: snapshot.isDragging ? '0.5' : '1'
                                                    }}
                                                    >
                                                        <ActivityCard
                                                            data={activity_itm}
                                                            isEditable={true}
                                                            openAddEditDialog={openAddEditDialog}
                                                            // setEditedItm={setEditedItm}
                                                            // setDeleteItm={deleteLeftCard}
                                                        />
                                                    </div>

                                                )}
                                                    
                                            </Draggable>
                                            
                                        )})}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>                            
                        </div> 
                        <button className="btn btn-outline-primary w-100"
                            onClick={() => openAddEditDialog("add", item.sessionName)}
                        >
                            {IconSetting(<IoMdAddCircleOutline/>, "", "16px")} Add Card
                        </button>
                        
                    </div>
                </div>
            ))
        }
      </div>
    </React.Fragment>
  )
}

export default CoursePlanner