import { HiOutlineDotsVertical } from "react-icons/hi";
import { IconSetting } from "../../utils/IconSetting";
import Board from "./Item/Board";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";

const CoursePlanner = ({activityData, activityFunction}) => {
    const {width2, activitiesData} = activityData
    const {
        openAddEditDialog, 
        setEditedItm, 
        deleteCardInBoard,
        setActivitiesData
    } = activityFunction
    
    return (
        <div className="d-flex flex-row" style={{width: `${width2}%`}}>
        {
            activitiesData.map((item) => {
                const ActivityBoardData = {item, activitiesData}
                const ActivityBoardFunction = {openAddEditDialog, setEditedItm, deleteCardInBoard}

                return(
                    <div className="activity_list_wrapper" style={{padding: "0 5px"}} key={item.sessionName}>
                        <div className="activity_list_content">
                            <div className="activity_list_header">
                                <h6>{item.sessionName}</h6>
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
    )
}

export default CoursePlanner