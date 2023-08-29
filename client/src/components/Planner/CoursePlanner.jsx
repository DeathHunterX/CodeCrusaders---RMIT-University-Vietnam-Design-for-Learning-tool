import { HiOutlineDotsVertical } from "react-icons/hi";
import { IconSetting } from "../../utils/IconSetting";
import Board from "./Item/Board";
import { IoMdAddCircleOutline } from "react-icons/io";

const CoursePlanner = ({activityData, activityFunction}) => {
    const {width2, activitiesData} = activityData
    const {
        openAddEditDialog, 
        setEditedItm, 
        deleteCardInBoard,
    } = activityFunction
    
    return (
        <div className="" style={{width: `${width2}%`}}>
            <div className="d-flex flex-row justify-content-center w-100">
            {
                activitiesData.map((item) => {
                    const ActivityBoardData = {item, activitiesData}
                    const ActivityBoardFunction = {openAddEditDialog, setEditedItm, deleteCardInBoard}

                    return(
                        <div className="activity_list_wrapper" style={{padding: "0 5px"}} key={item.sessionName}>
                            <div className="activity_list_content">
                                <div className="activity_list_header">
                                    <h6>{item.sessionName.replace(/_/g, ' ')}</h6>
                                    <div className="">
                                        <span>{IconSetting(<HiOutlineDotsVertical/>, "black", "23px")}</span>
                                    </div>
                                </div>

                                <Board compData={ActivityBoardData} compFunction={ActivityBoardFunction}/>
                                <button className="btn btn-outline-primary w-100"
                                    onClick={() => openAddEditDialog("add", item.sessionName)}
                                >
                                    {IconSetting(<IoMdAddCircleOutline/>, "", "16px")} Add Card
                                </button>
                            </div>
                        </div>  
                        
                    )
                })
            }
            </div>
        </div>
    )
}

export default CoursePlanner