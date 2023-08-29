import Avatar from "../../Avatar";
import AvatarImg from "../../../images/Avatar/avatar.jpg";
import { FiMoreVertical } from "react-icons/fi";
import { MdModeEdit } from "react-icons/md";
import { ImBin2 } from "react-icons/im";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CommentCard = ({compData, compFunction}) => {
    const {comment, textareaRef} = compData
    const {handleChangeTextareaHeight, handleEditComment} = compFunction

    const {accessToken} = useSelector(state => state.auth.token)
    const dispatch = useDispatch()

    const [editCommentState, setEditCommentState] = useState(false)
    const [editedData, setEditedData] = useState({content: comment.content})

    const handleChangeInput = (e) => {
        setEditedData(prevData => ({...prevData, content: e.target.value}))
    }
    

    const handleOpenCancelEditComment = () => {
        setEditCommentState(prevState => !prevState);
        setEditedData(comment.content);
    }

    const [replyState, setReplyState] = useState(false);
    const [reply, setReply] = useState({
        content: "",
        replyToId: "",
    });
    return (
        <li className="comment_box d-flex">
            <div className="avatar_comment me-2">
            <Avatar src={AvatarImg} size="medium-avatar" />
            </div>
            <div className="comment_result w-100">
                <div className="comment_content d-flex justify-content-between align-items-center">
                <div className="w-100 me-3">
                    {
                        editCommentState === true ? (
                            <div className="commendation_box p-0">
                                <div className="box_comment bg-white">
                                    <div className="box_comment_inner">
                                        <textarea ref={textareaRef} className="bg-white"
                                        onChange={handleChangeInput}
                                        value={editedData}
                                        />
                                    </div>
                                </div>  
                            </div>
                        )
                        :
                        (
                            <Fragment>
                                <h5>{comment.user.name}</h5>
                                <p>{comment.content}</p>
                            </Fragment>
                        )
                    }
                    
                </div>
                <div className="" id="commentDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span><FiMoreVertical/></span>
                </div>
                <div className="dropdown-menu" aria-labelledby="commentDropdown" style={{minWidth: "50px"}}>
                    <div className="d-flex flex-column">
                    <span className="px-3 my-2" style={{cursor: "pointer"}}
                    onClick={handleOpenCancelEditComment}>
                        <MdModeEdit/> Edit
                    </span>
                    <span className="px-3 my-2 text-danger" style={{cursor: "pointer"}}>
                        <ImBin2/> Delete
                    </span>
                    </div>
                </div>
                </div>
                
            

            <div className="tools_comment d-flex ms-3 mt-2">
                {/* <span className="tool_btn me-3">Like</span> */}
                {
                    editCommentState === true ? (
                        <Fragment>
                            <span className="tool_btn me-3" onClick={() => handleEditComment(comment.id, editedData, comment.content)}>Update</span>
                            <span className="tool_btn me-3" onClick={handleOpenCancelEditComment}>Cancel</span>
                        </Fragment>
                    )
                    :
                    (
                        <span className="tool_btn me-3" onClick={() => setReplyState(prevState => !prevState)}>Reply</span>
                    )
                }
                {/* <span className="comment_post_time me-3">26m</span>
                <div className="like_status d-flex align-items-center ms-4">
                {IconSetting(<FaThumbsUp />, 'blue', '12px')}
                <span className="count ms-1">1</span>
                </div> */}
                
            </div>
            {/* {
                replyState === true && (
                <div className="commendation_box d-flex">
                    <div className="avatar_comment me-2">
                    <Avatar src={AvatarImg} size="medium-avatar" />
                    </div>
                    <div className="box_comment">
                    <div className="box_comment_inner">
                        <textarea ref={textareaRef}
                        placeholder="Add a comment..."
                        value={reply.content}
                        onChange={handleChangeTextareaHeight}
                        />
                        
                        <button>Reply</button>
                    </div>
                    </div>  
                </div>
                )
            } */}
            
                
                <ul className="reply_list">
                    {
                    comment?.replies.length > 0 && comment?.replies.map((reply) => (
                        <li className="comment_box d-flex" key={reply.id}>
                        <div className="avatar_comment me-2">
                            <Avatar src={AvatarImg} size="medium-avatar" />
                        </div>
                        <div className="comment_result w-100">
                            <div className="comment_content">
                            <h5>{reply.user.name}</h5>
                            <p>{reply.content}</p>
                            </div>

                            <div className="tools_comment d-flex ms-3 mt-2">
                            {/* <span className="tool_btn">Like</span> */}
                            <span className="tool_btn ms-3">Reply</span>
                            {/* <span className="comment_post_time ms-3">26m</span>
                            <div className="like_status d-flex align-items-center ms-4">
                                {IconSetting(<FaThumbsUp />, 'blue', '12px')}
                                <span className="count ms-1">1</span>
                            </div> */} 
                            </div>                 
                        </div>
                        </li>
                    ))
                    }
                </ul>
            </div>
        </li>
    )
}

export default CommentCard