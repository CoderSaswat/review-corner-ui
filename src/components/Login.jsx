import React, { useState } from "react";
import "../css/signUp.css";
import { getUsersMe, login, signUp } from "../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({currentUser}) => {
  const {setCurrentUser} = currentUser;
  const [data, setData] = useState({});

  const navigator = useNavigate();

  const handleChange = (e) => {
    setData({...data,
        [e.target.name]:e.target.value})
  };

  const handleSubmit = () => {
    login(data).then((response) => {
      localStorage.setItem("accessToken", response.accessToken);
      getUsersMe().then((res) => {
        console.log(res)
        setCurrentUser(res);
        if(res?.role==="MODERATOR" && res?.isFirstLogin === true){
          // alert("moderator")
          navigator("/change-password");
        }else{
          navigator("/moderator-products");
        }
        if(res?.role==="END_USER"){
          // alert("moderator")
          navigator("/all-products");
        }
        toast.success("logged in successful");
        if(res.role === "ADMIN"){
          navigator("/admin-products");
        }
        // navigator("/add-todo");
      }).catch((err)=>{
        toast.error(err.response.data.message);
      })
    }).catch((err)=>{
      toast.error(err.response.data.message);
  })
  };

  return (
    <>
      <div className="sign-up">
        <form onSubmit={(e)=>{
            e.preventDefault();
        }}>
          <div className="sign-up-item">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className="sign-up-input-field" 
                          value={data?.email}
                          onChange={handleChange}/>
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
            <button className="signup-submit-button" onClick={handleSubmit}>Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
