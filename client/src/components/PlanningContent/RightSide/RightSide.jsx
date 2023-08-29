import React, {useRef} from "react";
import Avatar from "../../Avatar";
import AvatarImg from "../../../images/Avatar/avatar.jpg";

import {FaThumbsUp} from 'react-icons/fa';
import {IconSetting} from '../../../utils/IconSetting';

const RightSide = () => {
  const textareaRef = useRef(null);

  const handleChangeTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = '60px'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`
  };


  return (
    <div className="pdf_page_inner_container">
      <div className="pdf_page_content">
        <div className="course">
          <h5>
            Course: <span>Introduction to Information Technology</span>
          </h5>
        </div>
      </div>

      <div className="comment_result">
        <ul className="comment_list">

          <li className="comment_box d-flex">
            <div className="avatar_comment me-2">
              <Avatar src={AvatarImg} size="medium-avatar" />
            </div>
            <div className="comment_result">
              <div className="comment_content">
                <h5>Ngan Phan</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Molestiae, eaque officia fugit commodi cupiditate quibusdam
                  voluptas facere!
                </p>
              </div>

              <div className="tools_comment d-flex ms-3 mt-2">
                <span className="tool_btn">Like</span>
                <span className="tool_btn ms-3">Reply</span>
                <span className="comment_post_time ms-3">26m</span>
                <div className="like_status d-flex align-items-center ms-4">
                  {IconSetting(<FaThumbsUp />, 'blue', '12px')}
                  <span className="count ms-1">1</span>
                </div>
                
              </div>

              <ul className="reply_list">
                <li className="comment_box d-flex">
                  <div className="avatar_comment me-2">
                    <Avatar src={AvatarImg} size="medium-avatar" />
                  </div>
                  <div className="comment_result">
                    <div className="comment_content">
                      <h5>Loi Phan</h5>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        Molestiae, eaque officia fugit commodi cupiditate quibusdam
                        voluptas facere!
                      </p>
                    </div>

                    <div className="tools_comment d-flex ms-3 mt-2">
                      <span className="tool_btn">Like</span>
                      <span className="tool_btn ms-3">Reply</span>
                      <span className="comment_post_time ms-3">26m</span>
                      <div className="like_status d-flex align-items-center ms-4">
                        {IconSetting(<FaThumbsUp />, 'blue', '12px')}
                        <span className="count ms-1">1</span>
                      </div>
                      
                    </div>                 
                  </div>
                </li>
              </ul>
            </div>
          </li>

          <li className="comment_box d-flex">
            <div className="avatar_comment me-2">
              <Avatar src={AvatarImg} size="medium-avatar" />
            </div>
            <div className="comment_result">
              <div className="comment_content">
                <h5>Loi Phan</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Molestiae, eaque officia fugit commodi cupiditate quibusdam
                  voluptas facere!
                </p>
              </div>

              <div className="tools_comment d-flex ms-3 mt-2">
                <span className="tool_btn">Like</span>
                <span className="tool_btn ms-3">Reply</span>
                <span className="comment_post_time ms-3">26m</span>
                <div className="like_status d-flex align-items-center ms-4">
                  {IconSetting(<FaThumbsUp />, 'blue', '12px')}
                  <span className="count ms-1">1</span>
                </div>
                
              </div>

              <ul className="reply_list">

              </ul>
              
            </div>
          </li>

          <li className="comment_box d-flex">
            <div className="avatar_comment me-2">
              <Avatar src={AvatarImg} size="medium-avatar" />
            </div>
            <div className="comment_result">
              <div className="comment_content">
                <h5>Nhat Nguyen</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Molestiae, eaque officia fugit commodi cupiditate quibusdam
                  voluptas facere!
                </p>
              </div>

              <div className="tools_comment d-flex ms-3 mt-2">
                <span className="tool_btn">Like</span>
                <span className="tool_btn ms-3">Reply</span>
                <span className="comment_post_time ms-3">26m</span>
                <div className="like_status d-flex align-items-center ms-4">
                  {IconSetting(<FaThumbsUp />, 'blue', '12px')}
                  <span className="count ms-1">1</span>
                </div>
                
              </div>

              <ul className="reply_list">

              </ul>
              
            </div>
          </li>

          <li className="comment_box d-flex">
            <div className="avatar_comment me-2">
              <Avatar src={AvatarImg} size="medium-avatar" />
            </div>
            <div className="comment_result">
              <div className="comment_content">
                <h5>Khang Nguyen</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Molestiae, eaque officia fugit commodi cupiditate quibusdam
                  voluptas facere!
                </p>
              </div>

              <div className="tools_comment d-flex ms-3 mt-2">
                <span className="tool_btn">Like</span>
                <span className="tool_btn ms-3">Reply</span>
                <span className="comment_post_time ms-3">26m</span>
                <div className="like_status d-flex align-items-center ms-4">
                  {IconSetting(<FaThumbsUp />, 'blue', '12px')}
                  <span className="count ms-1">1</span>
                </div>
                
              </div>

              <ul className="reply_list">

              </ul>
              
            </div>
          </li>

          
        </ul>
      </div>

      <div className="commendation_box d-flex">
        <div className="avatar_comment me-2">
          <Avatar src={AvatarImg} size="medium-avatar" />
        </div>
        <div className="box_comment">
          <div className="box_comment_inner">
            <textarea ref={textareaRef}
              name="commentar"
              placeholder="Add a comment..."
              onChange={handleChangeTextareaHeight}
            />
            
            <button>Reply</button>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default RightSide;
