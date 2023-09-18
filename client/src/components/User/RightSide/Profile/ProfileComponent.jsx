import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";

import AvatarImg from "../../../../images/Avatar/avatar.jpg";

const ProfileComponent = () => {
  const {user} = useSelector(state => state.auth)
  const ProfileState = {
    name: "",
    username: "",
  }

  const [profileData, setProfileData] = useState(ProfileState);
  const {name, username} = profileData;

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name ? user.name : "",
        username: user.username ? user.username : ""
      })
    }
  }, [user])

  return (
    <div className="edit_profile px-4">
      <div className="heading-info-profile d-flex">
        <div className="info_avatar">
          <img
            src={AvatarImg}
            alt="avatar"
          />

        </div>
        <div className="info-user">
          <h4 className="px-2">{name}</h4>
          <table className="table mt-2">
            <tbody>
              <tr>
                  <th>Username: </th>
                  <td>{username}</td>
              </tr>
              <tr>
                  <th>Role: </th>
                  <td>Team Manager</td>
              </tr>
              <tr>
                  <th>Address: </th>
                  <td>HCM City, Vietnam</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
