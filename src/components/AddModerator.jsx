import React, { useState } from "react";
import "../css/signUp.css";
import { addModerator, getUsersMe, signUp } from "../services/userService";
import { toast } from "react-toastify";

const AddModerator = () => {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    setData({...data,
        [e.target.name]:e.target.value})
  };

  const handleSubmit = () => {
    // console.log(data)
    addModerator(data).then((res)=>{
        toast.success("invitation succesfully sent")
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
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="sign-up-input-field"
              value={data?.name}
              onChange={handleChange}
            />
          </div>
          <div className="sign-up-item">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className="sign-up-input-field" 
                          value={data?.email}
                          onChange={handleChange}/>
          </div>
          <div className="sign-up-item">
            <button className="signup-submit-button" onClick={handleSubmit}>Add</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddModerator;
