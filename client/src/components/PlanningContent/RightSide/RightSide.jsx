import React, {useEffect, useRef, useState} from "react";
import Avatar from "../../Avatar";
import AvatarImg from "../../../images/Avatar/avatar.jpg";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify"
// import {FaThumbsUp} from 'react-icons/fa';

// import {IconSetting} from '../../../utils/IconSetting';
import { useDispatch, useSelector } from "react-redux";
import { createComment, deleteComment, editComment, emptyCommentValue, resetCommentState } from "../../../redux/slices/commentSlice";
import CommentCard from "./CommentCard";

const RightSide = () => {
  const {sharingData} = useSelector(state => state.sharing);
  const {commentData, commentValue, isCreated, isEdited, isReplied, isDeleted, isError, message} = useSelector(state => state.comment);
  const {accessToken} = useSelector(state => state.auth.token)
  const dispatch = useDispatch();

  const {id} = useParams();
  const textareaRef = useRef(null);

  const handleChangeTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = '40px'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
  };

  const [comments, setComments] = useState([]);
  const [addComment, setAddComment] = useState({content: ""});

  // Get comments
  useEffect(() => {
    setComments(commentData);
  }, [commentData]);

  const handleChangeInput = (e) => {
    handleChangeTextareaHeight(); 
    setAddComment(prevState => ({...prevState, content: e.target.value}));
  }
  const handleCreateComment = () => {
    if(addComment !== "") {
      dispatch(createComment({sharingID: id, commentData: addComment, token: accessToken}))
    }
  }

  const handleEditComment = (commentID, dataChanged, data) => {
    if (dataChanged !== data) {
      dispatch(editComment({commentID: commentID, commentData: dataChanged, token: accessToken}))
    }
  }

  const [deletedCommentID, setDeletedCommentID] = useState("")
  const handleDeleteComment = (commentID) => {
    setDeletedCommentID(commentID)
    dispatch(deleteComment({commentID: commentID, token: accessToken}))
  }

  useEffect(() => {
    if (isCreated) {
      setComments(prevData => ([...prevData, commentValue]))
      setAddComment(prevState => ({...prevState, content: ""}))
      dispatch(emptyCommentValue())
      dispatch(resetCommentState())
    } else if (isEdited) {
      setComments(prevData => prevData.map(obj => {
          if(obj.id === commentValue.id) {
              return {
                  ...obj,
                  content: commentValue.content
              }
          }
          return obj;
        }
      ))
      dispatch(emptyCommentValue())
      dispatch(resetCommentState())
    } else if (isDeleted) {
      setComments(prevData => prevData.filter((item) => item.id !== deletedCommentID))
    } else if (isError) {
      toast.error(message);
      dispatch(resetCommentState())
    }
  }, [addComment, commentValue, deletedCommentID, dispatch, isCreated, isDeleted, isEdited, isError, isReplied, message])


  return (
    <div className="pdf_page_inner_container">
      <div className="pdf_page_content">
        <div className="course">
          <h6 style={{fontSize: "18px"}}>
            Course: <span>{sharingData?.courseCode} - {sharingData?.courseName}</span>
          </h6>
          <h6 style={{fontSize: "18px"}}>
            Module: <span>{sharingData?.name}</span>
          </h6>
        </div>
      </div>

      <div className="comment_result">
        <ul className="comment_list">
          {
            comments.length > 0 && comments?.map((comment) => {
              const CommentCardData = {comment, textareaRef}
              const CommentCardFunction = {handleChangeTextareaHeight, handleEditComment, handleDeleteComment}
              return(
                <CommentCard compData={CommentCardData} compFunction={CommentCardFunction} key={comment.id}/>
              )}
            )
          }      
        </ul>
      </div>

      <div className="commendation_box d-flex">
        <div className="avatar_comment me-2">
          <Avatar src={AvatarImg} size="medium-avatar" />
        </div>
        <div className="box_comment">
          <div className="box_comment_inner">
            <textarea ref={textareaRef}
              placeholder="Add a comment..."
              onChange={handleChangeInput}
              value={addComment.content}
            />
            
            <button onClick={handleCreateComment}>Reply</button>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default RightSide;
