import React from "react";
import Avatar from "../../Avatar";
import AvatarImg from "../../../images/Avatar/avatar.jpg";

const LeftSide = () => {
  return (
    <div className="rightSide">
      <div className="content">
        <div className="course">
          <h5>
            Course: <span>Introduction to Infomation Technology</span>
          </h5>
        </div>
      </div>
      <div className="comments">
        <div className="row">
          <div className="avatar_comment col-md-2">
            <Avatar src={AvatarImg} size="medium-avatar" />
          </div>
          <div className="box_comment col-md-10">
            <textarea
              name="commentar"
              placeholder="Add a comment..."
            ></textarea>
            <div className="box_post">
              <div className="pull-right">
                <button>Reply</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <ul id="list_comment" className="col-md-12">
            {/* start list comment */}
            <li className="box_result row">
              <div className="avatar_comment col-md-2">
                <Avatar src={AvatarImg} size="medium-avatar" />
              </div>
              <div className="result_comment col-md-10">
                <div className="name_comment">
                  <h5>Phan Ngan</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Molestiae, eaque officia fugit commodi cupiditate quibusdam
                    voluptas facere!
                  </p>
                </div>
                <div className="tools_comment">
                  <a href="" className="like">
                    Like
                  </a>
                  <span aria-hidden="true"> · </span>
                  <a href="" className="like">
                    Reply
                  </a>
                  <span aria-hidden="true"> · </span>
                  <i class="fa fa-thumbs-o-up"></i> <span class="count">1</span>
                  <span aria-hidden="true"> · </span>
                  <span>26m</span>
                </div>

                <li className="box_reply row">
                  <div className="avatar_comment col-md-2">
                    <Avatar src={AvatarImg} size="medium-avatar" />
                  </div>
                  <div className="result_comment col-md-10">
                    <div className="name_comment">
                      <h5>Phan Loi</h5>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Molestiae, eaque officia fugit commodi cupiditate
                        quibusdam voluptas facere!
                      </p>
                    </div>
                    <div className="tools_comment">
                      <a href="" className="like">
                        Like
                      </a>
                      <span aria-hidden="true"> · </span>
                      <a href="" className="like">
                        Reply
                      </a>
                      <span aria-hidden="true"> · </span>
                      <i class="fa fa-thumbs-o-up"></i>{" "}
                      <span class="count">1</span>
                      <span aria-hidden="true"> · </span>
                      <span>26m</span>
                    </div>
                  </div>
                </li>
              </div>
            </li>

            {/* start list comment */}
            <li class="box_result row">
              <div class="avatar_comment col-md-2">
                <Avatar src={AvatarImg} size="medium-avatar" />
              </div>
              <div class="result_comment col-md-10">
                <div className="name_comment">
                  <h5>Phan Loi</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's.
                  </p>
                </div>
                <div class="tools_comment">
                  <a class="like" href="#">
                    Like
                  </a>
                  <span aria-hidden="true"> · </span>
                  <a class="replay" href="#">
                    Reply
                  </a>
                  <span aria-hidden="true"> · </span>
                  <i class="fa fa-thumbs-o-up"></i> <span class="count">1</span>
                  <span aria-hidden="true"> · </span>
                  <span>26m</span>
                </div>
                <ul class="child_replay"></ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
