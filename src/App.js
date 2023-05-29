import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import OtpVarify from './components/OtpVarify'
import axios from 'axios'
import { getUsersMe } from './services/userService'
import Login from './components/Login'
import { ThreeCircles } from 'react-loader-spinner'
import AddModerator from './components/AddModerator'
import ViewModerators from './components/ViewModerators'
import ChangePassword from './components/ChangePassword'
import Products from './components/Products'
import Product from './components/Product'
import Homescreen from './components/Homescreen'

const App = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
    if (localStorage.getItem("accessToken") != null) {  
      getUsersMe()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  axios.interceptors.request.use(
    (request) => {
      setIsLoader(true);
      const token = localStorage.getItem("accessToken");
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return Promise.resolve(request);
    },
    (error) => {
      setIsLoader(false);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      setIsLoader(false);
      return Promise.resolve(response);
    },
    (error) => {
      setIsLoader(false);
      return Promise.reject(error);
    }
  );
  return (
    <>
    <BrowserRouter>
      <Navbar user={{currentUser, setCurrentUser}}/>
      <ToastContainer position="bottom-left" autoClose={1000} closeOnClick />
      <ThreeCircles
          height="50"
          width="50"
          color="#4fa94d"
          wrapperStyle={{
            position: "absolute",
            top: "50%",
            right: "50%",
          }}
          wrapperClass=""
          visible={isLoader}
          ariaLabel="three-circles-rotating"
          outerCircleColor="black"
          innerCircleColor="red"
          middleCircleColor="green"
        />
      <Routes>
        <Route path="/email-varify" element={<OtpVarify/>}/>
        <Route path="/sign-up" element={<SignUp currentUser={{currentUser,setCurrentUser}}/>}/>
        <Route path="/login" element={<Login currentUser={{currentUser,setCurrentUser}}/>}/>
        <Route path="/add-moderators" element={<AddModerator/>}/>
        <Route path="/view-moderators" element={<ViewModerators/>}/>
        <Route path='/change-password'element={<ChangePassword/>}/>
        <Route path='/all-products'element={<Products/>}/>
        <Route path='/one-product/:id'element={<Product/>}/>
        <Route path='/'element={<Homescreen/>}/>
      </Routes>

      {/* <OtpVarify/> */}
    </BrowserRouter>
    </>
  )
}

export default App