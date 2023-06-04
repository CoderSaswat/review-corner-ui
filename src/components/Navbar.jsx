import React from "react";
import "../css/navbar.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar({ user }) {
  const { currentUser, setCurrentUser } = user;
  return (
    <>
      <div className="navbar">
        <div className="navbar-item">Review Corner</div>
        {currentUser?.role === "ADMIN" ? (
          <>
            <div className="login-signup">
              <Link to={"/view-moderators"}>
                <button className="login-signup-button moderator-button">View Moderators</button>
              </Link>
              <Link to={"/add-moderators"}>
                <button className="login-signup-button moderator-button">Add Moderators</button>
              </Link>
              <Link to={"/admin-products"}>
                <button className="login-signup-button moderator-button">View Products</button>
              </Link>
              <Link to={"/add-product"}>
                <button className="login-signup-button moderator-button">Add Product</button>
              </Link>
            </div>
          </>
        ) : (
          <></>
        )}

        {currentUser == null ? (
          <>
            <div className="login-signup">
              <Link to={"/email-varify"}>
                <button className="login-signup-button">Sign-up</button>
              </Link>
              <Link to={"/login"}>
                <button className="login-signup-button">Login</button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="login-signup">
              <div className="profile">
                <p>{currentUser?.email}</p>
              </div>
              <Link to={"/"}>
                <button
                  className="login-signup-button"
                  onClick={() => {
                    setCurrentUser(null);
                    localStorage.clear();
                    toast.success("logged out successfully");
                  }}
                >
                  Logout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
