import React, { useEffect, useState } from "react";
import "../css/signUp.css";
import { toast } from "react-toastify";
import {
  AddProductByAdmin,
  addProductByAdmin,
  getCategories,
  uploadFile,
} from "../services/productService";
import ProductPrice from "./ProductPrice";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const navigator = useNavigate();
  const [prices, setPrices] = useState([
    {
      price: "",
      company: "",
      companyLogoUrl: "",
      productLink: "",
    },
  ]);
  const [data, setData] = useState({
    prices: [],
  });
  const [categories, setCategories] = useState([]);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res);
        setData({ ...data, ["categoryId"]: res[0]?.id });
        // console.log(res);
      })
      .catch((err) => {
        toast.error("error fetching categories");
      });
  }, []);

  const handleSubmit = () => {
    addProductByAdmin(data)
      .then((res) => {
        toast.success("product successfully added");
        navigator(`/one-product-admin/${res?.id}`);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    console.log(data);
  };
  const handleDropDownChange = (e) => {
    // alert(e.target.name +":"+e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    uploadFile(file)
      .then((res) => {
        console.log("link ---->", res);
        setData({ ...data, [e.target.name]: res });
      })
      .then((err) => {
        console.log(err);
      });
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (index, name, value) => {
    const newPrices = [...prices];
    newPrices[index] = { ...newPrices[index], [name]: value };
    setPrices(newPrices);
    setData({ ...data, ["prices"]: newPrices });
  };

  const handleRemovePrice = (index) => {
    // alert(index);
    console.log(index);
    const newPrices = [...prices];
    // console.log(newPrices)
    newPrices.splice(index, 1);
    // console.log(newPrices)
    // // const newPrices = prices.filter((_, i) => i !== index);
    setPrices(newPrices);
    setData({ ...data, ["prices"]: newPrices });
    // console.log(newPrices)
  };

  const handleAddPrice = () => {
    setPrices([
      ...prices,
      {
        price: "",
        company: "",
        companyLogoUrl: "",
        productLink: "",
      },
    ]);
  };

  return (
    <>
      <div className="sign-up">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <label for="categoryId">Choose a category: </label>
            <select
              name="categoryId"
              id="categoryId"
              value={data?.categoryId}
              onChange={handleDropDownChange}
            >
              {categories?.map((category, index) => {
                return <option value={category?.id}>{category?.name}</option>;
              })}
            </select>
          </div>
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
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              className="sign-up-input-field"
              value={data?.description}
              onChange={handleChange}
            />
          </div>
          <div className="sign-up-item">
            <label htmlFor="description">Product Image</label>
            {data?.productPhotoUrl && (
              <>
                <img
                  src={data?.productPhotoUrl}
                  alt=""
                  style={{ width: "10vw" }}
                />
              </>
            )}
            <input
              type="file"
              name="productPhotoUrl"
              id=""
              onChange={handleFileChange}
            />
          </div>
          <br />
          <div className="sign-up-item">
            {prices.map((price, index) => {
              return (
                <>
                  <ProductPrice
                    key={index}
                    price={price}
                    onChange={(name, value) =>
                      handlePriceChange(index, name, value)
                    }
                    // onClick={() => handleRemovePrice(index)}
                  />
                  <button
                    className="remove-price"
                    onClick={() => handleRemovePrice(index)}
                  >
                    Remove
                  </button>
                </>
              );
            })}
          </div>
          <div className="sign-up-item ">
            <button
              className="signup-submit-button add-price"
              onClick={handleAddPrice}
            >
              Add More Prices
            </button>
          </div>
          <br />

          <div className="sign-up-item">
            <button
              className="signup-submit-button add-product"
              onClick={handleSubmit}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
