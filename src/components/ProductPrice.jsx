import React, { useEffect, useState } from "react";
import "../css/signUp.css";
import { toast } from "react-toastify";
import { getCategories, uploadFile } from "../services/productService";

const ProductPrice = ({ key,price, onChange, onRemove }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      onChange(name, parseFloat(value));
    } else {
      onChange(name, value);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    onRemove(key);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    uploadFile(file)
      .then((res) => {
        console.log("link ---->", res);
        //   setData({ ...data, [e.target.name]: res });
        const name = e.target.name;
        const companyLogoUrl = res;
        onChange(name, companyLogoUrl);
      })
      .then((err) => {
        console.log(err);
      });
    //   setData({ ...data, [e.target.name]: e.target.value });
  };

  const renderImage = () => {
    return;
    <>hu</>;
  };

  return (
    <>
      <div className="product-price">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="sign-up-item">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              className="sign-up-input-field"
              value={price?.price}
              onChange={handleChange}
            />
          </div>
          <div className="sign-up-item">
            <label htmlFor="company">Company Name</label>
            <div></div>
            <input
              type="text"
              name="company"
              className="sign-up-input-field"
              value={price?.company}
              onChange={handleChange}
            />
          </div>
          <div className="sign-up-item">
            <label htmlFor="name">Company Logo</label>
            {price?.companyLogoUrl && (
              <>
                <img
                  src={price?.companyLogoUrl}
                  alt=""
                  style={{ width: "5vw", marginTop: "5px" }}
                />
              </>
            )}
            <div className="sign-up-item">
              <input
                type="file"
                name="companyLogoUrl"
                id=""
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="sign-up-item">
            <label htmlFor="productLink">Product Link</label>
            <input
              type="text"
              name="productLink"
              className="sign-up-input-field"
              value={price?.productLink}
              onChange={handleChange}
            />
          </div>
          <button className="remove-price" onClick={(e)=>handleRemove(e)}>
            Remove
          </button>
          <br />
        </form>
      </div>
    </>
  );
};

export default ProductPrice;
