import React, { useState } from "react";
import "../css/signUp.css";
import { sendOtp, varifyOtp } from "../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OtpVarify = () => {
  const [data, setData] = useState({});
  const [isOtpSent, setIsOtpSent] = useState(false);

  const navigator = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSendOtp = () => {
    sendOtp(data)
      .then((res) => {
        setIsOtpSent(true);
        toast.success("opt successfully sent");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleVarifyOtp = () => {
    varifyOtp(data)
      .then((res) => {
        setIsOtpSent(true);
        toast.success("opt successfully varified");
        navigator("/sign-up");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
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
          {!isOtpSent ? (
            <>
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
                <button
                  className="signup-submit-button"
                  onClick={handleSendOtp}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="sign-up-item">
                <label htmlFor="otp">Enter Otp</label>
                <input
                  type="number"
                  name="otp"
                  className="sign-up-input-field"
                  value={data?.otp}
                  onChange={handleChange}
                />
              </div>
              <div className="sign-up-item">
                <button
                  className="signup-submit-button"
                  onClick={handleVarifyOtp}
                >
                  Send
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default OtpVarify;
