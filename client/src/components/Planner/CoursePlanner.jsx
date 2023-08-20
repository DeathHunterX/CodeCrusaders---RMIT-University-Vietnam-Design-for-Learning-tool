import { useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Resizable } from "re-resizable";

import ModuleComponent from "./Module/ModuleComponent";
import { IconSetting } from "../../utils/IconSetting";
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ActivityCard from "./Activity/Card/ActivityCard";

import PlannerDescription from "./ModulePlanner/PlannerDescription";

const CoursePlanner = ({activityData, activityFunction}) => {
  // Resizable
  // Initial widths
  const initialWidth1 = 15;
  const initialWidth2 = 100 - initialWidth1;

  const minWidthVal = 12;
  const maxWidthVal = 18;

  // State to track the widths of the boxes
  const [width1, setWidth1] = useState(initialWidth1);
  const [width2, setWidth2] = useState(initialWidth2);

  // Handle resizing of Box 1 (resizable only on the right side)
  const handleResize1 = (event, direction, ref, delta) => {
      // Calculate new widths
      const newWidth1 = width1 + delta.width;
      const newWidth2 = 100 - newWidth1;


      // Update state while respecting minWidth and maxWidth
      if (newWidth1 >= minWidthVal && newWidth1 <= maxWidthVal) {
          setWidth1(newWidth1);
          setWidth2(newWidth2);
      }
  }

  // Other function

  const {id, leftActivities, rightActivities, activityType, activeTabs, filteredBoards} = activityData
  const {
    dispatch, 
    setPopUpStat, 
    openAddEditDialog, 
    setActivityType, 
    setActivityWindow, 
    setEditedItm, 
    deleteLeftCard, 
    setActiveTabs, 
    deleteRightCard
  } = activityFunction
  return (
    <>
      <Resizable
          onResize={handleResize1}
          defaultSize={{ width: `${width1}%`, height: '100%' }}
          minWidth={`${minWidthVal}%`}
          maxWidth={`${maxWidthVal}%`}
          enable={{ right: true }}
          style={{ borderRight: '2px solid black' }}
      >
          <ModuleComponent courseID={id} dispatch={dispatch} setPopUpStat={setPopUpStat}/>
      </Resizable>

      <div className="d-flex flex-row" style={{width: `${width2}%`}}>
          <div className="activity_list_wrapper" style={{padding: "0 5px"}}>
              <div className="activity_list_content">
                  <div className="activity_list_header">
                      <h6>Activity Storage</h6>
                      <div className="">
                          <span className="me-2" 
                          onClick={() => openAddEditDialog()}
                          >
                              {IconSetting(<IoMdAddCircleOutline/>, "black", "23px")}
                          </span>
                          <span>{IconSetting(<HiOutlineDotsVertical/>, "black", "23px")}</span>
                      </div>
                  </div>
                  
                  <div className="activity_list_body">
                      <Droppable droppableId='left_board'>
                          {(provided) => (
                              <ul className="activity_list_cards" style={{padding: '10px 0'}}
                              ref={provided.innerRef} 
                                  {...provided.droppableProps}
                              >
                                  {leftActivities.map((activity_itm, idx) => (   

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
                                                      activityType={activityType}
                                                      setActivityType={setActivityType}
                                                      setActivityWindow={setActivityWindow}
                                                      setEditedItm={setEditedItm}
                                                      setDeleteItm={deleteLeftCard}
                                                  />
                                              </div>

                                          )}
                                              
                                      </Draggable>
                                      
                                  ))}
                                  {provided.placeholder}
                              </ul>
                          )}
                      </Droppable>
                          
                  </div> 
                  
              </div>
          </div>
              
          <div className="activity_list_tabs">
              <div className="activity_tabbed_round">
                  <div className="tabs_header">
                  <ul >
                      {
                      rightActivities.map((entry,idx) => (
                          <li
                          className={`tabs ${activeTabs === entry.name ? "active_tabs" : ""}`}
                          onClick={() => setActiveTabs(entry.name)} key={idx}
                          >
                          {entry.name}
                          </li>
                      ))
                      }
                  </ul>
                  
                  </div>
                  <div className="tabs_body">
                  {filteredBoards.map((board, idx) => (
                      <PlannerDescription data={board} key={idx}
                      tabName={activeTabs}
                      rightActivities={rightActivities}
                      activityType={activityType}
                      setActivityType={setActivityType}
                      setActivityWindow={setActivityWindow}
                      setEditedItm={setEditedItm}
                      setDeleteItm={deleteRightCard}
                      />
                  ))}
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default CoursePlanner