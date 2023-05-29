import React, { useState } from "react";
import "../css/signUp.css";
import { changePassword, getUsersMe, login, signUp } from "../services/userService";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    setData({...data,
        [e.target.name]:e.target.value})
  };

  const handleSubmit = () => {
    // console.log(data)
    changePassword(data).then((res)=>{
        toast.success("password successfully changed");
    }).catch((err)=>{
        toast.error(err.response.data.message)
    })
  };

  return (
    <>
      <div className="sign-up">
        <form onSubmit={(e)=>{
            e.preventDefault();
        }}>

          <div className="sign-up-item">
            <label htmlFor="password">Old Password</label>
            <input
              type="text"
              name="oldPassword"
              className="sign-up-input-field"
              value={data?.oldPassword}
              onChange={handleChange}
            />
          </div>
          <div className="sign-up-item">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              className="sign-up-input-field"
              value={data?.password}
              onChange={handleChange}
            />
          </div>
          <div className="sign-up-item">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="text"
              name="confirmPassword"
              className="sign-up-input-field"
              value={data?.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="sign-up-item">
            <button className="signup-submit-button change-password-buttom" onClick={handleSubmit}>Change Password</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
