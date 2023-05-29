import React, { useState } from "react";
import "../css/signUp.css";
import { getUsersMe, signUp } from "../services/userService";
import { toast } from "react-toastify";

const SignUp = ({ currentUser }) => {
  const { setCurrentUser } = currentUser;
  const [data, setData] = useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    signUp(data)
      .then((response) => {
        localStorage.setItem("accessToken", response.accessToken);
        getUsersMe()
          .then((res) => {
            setCurrentUser(res);
            toast.success("signed up successful");
            // navigator("/add-todo");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <div className="sign-up">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
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
            <input
              type="email"
              name="email"
              className="sign-up-input-field"
              value={data?.email}
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
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="text"
              name="confirmPassword"
              className="sign-up-input-field"
              value={data?.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="sign-up-item">
            <button className="signup-submit-button" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
