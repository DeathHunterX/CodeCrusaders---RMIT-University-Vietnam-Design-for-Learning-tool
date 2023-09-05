import React, { useState } from "react";
// import { CheckImage } from '../../../../utils/CheckImage'
import {
  FaCamera,
  FaFacebook,
  FaLink,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

import AvatarImg from "../../../../images/Avatar/avatar.jpg";
import { FRONT_END_URL } from "../../../../proxy";

const ProfileComponent = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    phone: "",
    fullName: "",
    displayName: "",
    address: "",
    description: "",
    country: "",
    city: "",
    detailAdd: "",
  };

  const [userData, setUserData] = useState(initialState);
  const {
    firstName,
    lastName,
    fullName,
    displayName,
    description,
    country,
    city,
  } = userData;

  const [avatar, setAvatar] = useState("");

  // const { auth } = useSelector(state => state)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //     setUserData(auth.user)
  // }, [auth.user])

  const changeAvatar = (e) => {
    const file = e.target.files[0];

    // const err = CheckImage(file)
    // if(err) return dispatch({
    //     type: GLOBALTYPES.ALERT,
    //     payload: {error: err}
    // })
    setAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateProfileUser({userData, avatar, auth}))
  };
  return (
    <div className="edit_profile px-4">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="leftSide col-8">
            <div className="row">
              <div className="form_group mb-3 col-md-6">
                <label htmlFor="fullname">Username</label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={fullName}
                    onChange={handleInput}
                  />
                  <small
                    className="text-danger position-absolute"
                    style={{
                      top: "50%",
                      right: "5px",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {fullName.length ? fullName.length : 0}/25
                  </small>
                </div>
              </div>
              <div className="form_group mb-3 col-md-6">
                <label htmlFor="mobile">Display Name</label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="displayName"
                    name="displayName"
                    value={displayName}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="form_group mb-3 col-md-6">
                <label htmlFor="firstName">First Name</label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={handleInput}
                  />
                  <small
                    className="text-danger position-absolute"
                    style={{
                      top: "50%",
                      right: "5px",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {firstName.length ? firstName.length : 0}/25
                  </small>
                </div>
              </div>

              <div className="form_group mb-3 col-md-6">
                <label htmlFor="lastName">Last Name</label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={handleInput}
                  />
                  <small
                    className="text-danger position-absolute"
                    style={{
                      top: "50%",
                      right: "5px",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {lastName.length ? lastName.length : 0}/25
                  </small>
                </div>
              </div>



              <div className="form_group mb-3 col-md-6">
                <label htmlFor="country">Country</label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={country}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="form_group mb-3 col-md-6">
                <label htmlFor="city">City/State</label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={city}
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className="form_group mb-3">
                <label htmlFor="description">About Me (Description)</label>
                <div className="position-relative">
                  <textarea
                    className="form-control"
                    id="description"
                    cols="30"
                    rows="10"
                    name="description"
                    value={description}
                    onChange={handleInput}
                  />
                  <div className="d-flex justify-content-between">
                    <small className="text-danger d-block">
                      {description.length ? description.length : 0}/5000
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rightSide col-4">
            <div className="d-flex">
              <div className="info_avatar">
                {/* <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} 
                            alt="avatar"/> */}
                <img
                  src={avatar ? URL.createObjectURL(avatar) : AvatarImg}
                  alt="avatar"
                />
                <span>
                  <FaCamera />
                  <p>Change</p>
                  <input
                    type="file"
                    name="file"
                    id="file_up"
                    accept="image/*"
                    onChange={changeAvatar}
                  />
                </span>
              </div>
              <div className="info-user">
                <h4>Phan Thanh Loi</h4>
                <h5>Team Manager</h5>
                <p>HCM, Viet Nam</p>
              </div>
            </div>
            <div className="social">
              <div className="form_group mb-3">
                <label className="sr-only" htmlFor="inlineFormInputGroup">
                  Twitter
                </label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <span>
                        <FaLink />
                      </span>{" "}
                    </div>
                  </div>
                  <div
                    className="input-group-text"
                    style={{ backgroundColor: "none" }}
                  >
                    {" "}
                    <span>{FRONT_END_URL}/profile/01</span>{" "}
                  </div>
                </div>
              </div>

              <div className="form_group mb-3">
                <label className="sr-only" htmlFor="inlineFormInputGroup">
                  Twitter
                </label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <span>
                        <FaTwitter />
                      </span>{" "}
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroup"
                    placeholder="Twitter Link"
                  />
                </div>
              </div>

              <div className="form_group mb-3">
                <label className="sr-only" htmlFor="inlineFormInputGroup">
                  Linkedin
                </label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <span>
                        <FaLinkedin />
                      </span>{" "}
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroup"
                    placeholder="Linkedin Link"
                  />
                </div>
              </div>

              <div className="form_group mb-3">
                <label className="sr-only" htmlFor="inlineFormInputGroup">
                  Facebook
                </label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <span>
                        <FaFacebook />
                      </span>{" "}
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroup"
                    placeholder="Facebook Link"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <button className="btn me-2"> Cancel</button>
          <button className="btn btn-info text-white" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileComponent;
