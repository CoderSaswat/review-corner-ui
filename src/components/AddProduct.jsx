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

  // additonalInfo
  const [isAddAdditionalInfo, setIsAddAdditionalInfo] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState({});
  const [currentKey, setCurrentKey] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  //used to store the current Object (current key-value pair)
  const [productDetalsData, setProductDetailsData] = useState({});

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
    // console.log(data);
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
  // console.log(prices);

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

  const handleAddAdditionalProduct = () => {
    setIsAddAdditionalInfo(true);
  };

  const handlePropertyNameInputChange = (e) => {
    setProductDetailsData({
      ...productDetalsData,
      [e.target.name]: e.target.value,
    });
    setCurrentKey(e.target.value);
  };

  const handlePropertyValueInputChange = (e) => {
    setProductDetailsData({
      ...productDetalsData,
      [e.target.name]: e.target.value,
    });
    setCurrentValue(e.target.value);
  };

  const handleAddAdditionalInfoNameAndPropertyPair = () => {
    if (currentKey && currentValue) {
      setAdditionalInfo((prevAdditionalInfo) => {
        const updatedAdditionalInfo = {
          ...prevAdditionalInfo,
          [currentKey]: currentValue,
        };
        setCurrentKey("");
        setCurrentValue("");
        setIsAddAdditionalInfo(false);
        setProductDetailsData({});
        setData({ ...data, additionalInfo: updatedAdditionalInfo });
        return updatedAdditionalInfo;
      });
    }
  };

  const removeOneAdditionalProductDetails = (key) => {
    const updatedAdditionalInfo = { ...additionalInfo };
    delete updatedAdditionalInfo[key];
    setAdditionalInfo(updatedAdditionalInfo);
  };

  return (
    <>
      {isAddAdditionalInfo ? (
        <>
          <div className=" additional-info-product">
            <textarea
              className="sign-up-input-field property-name-input"
              name="key"
              id=""
              cols="30"
              rows="2"
              placeholder="add Property name"
              value={productDetalsData?.key}
              onChange={handlePropertyNameInputChange}
            ></textarea>
            <textarea
              className="sign-up-input-field property-value-input"
              name="value"
              id=""
              cols="30"
              rows="2"
              placeholder="add property value"
              value={productDetalsData?.value}
              onChange={handlePropertyValueInputChange}
            ></textarea>
            <div>
              <button
                onClick={handleAddAdditionalInfoNameAndPropertyPair}
                className="confirm-yes"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsAddAdditionalInfo(false);
                  setCurrentKey("");
                  setCurrentValue("");
                }}
                className="confirm-no"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="sign-up">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <p className="product-heading-add-edit-page">
              Product Information:-
            </p>
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
          <div>
            <p className="product-heading-add-edit-page">
              Additional Information:-
            </p>
            {Object.entries(additionalInfo).map(([key, value]) => (
              <div key={key}>
                <label htmlFor="key">property name</label>
                <br />
                <input
                  type="text"
                  value={key}
                  className="sign-up-input-field additional-info-key"
                  // onChange={(e) => handleChange(key,e.target.value)}
                  readonly
                />
                <br />
                <label htmlFor="value">property value</label>
                <br />
                <input
                  type="text"
                  value={value}
                  className="sign-up-input-field additional-info-value"
                  // onChange={(e) =>
                  //   handleInputChange(key, e.target.value)
                  // }
                />
                <br />
                <button
                  className="remove-price"
                  onClick={() => removeOneAdditionalProductDetails(key)}
                >
                  Remove
                </button>
                {/* <p>---------------------------------------------------------</p> */}
                <br />
                <br />
              </div>
            ))}
          </div>
          <br />
          <button
            className="add-price add-additional-info-button"
            onClick={handleAddAdditionalProduct}
          >
            Add additional Information
          </button>
          <div className="sign-up-item">
            <p className="product-heading-add-edit-page">
              Prices Form Different Companies:-
            </p>
              {prices.map((price, index) => {
                return (
                  <>
                  <div className="price-item">
                  <ProductPrice
                      key={index}
                      price={price}
                      onChange={(name, value) =>
                        handlePriceChange(index, name, value)
                      }
                      onRemove={() => handleRemovePrice(index)}
                    />
                  </div>

                    {/* <button
                    className="remove-price price-rmv"
                    onClick={() => handleRemovePrice(index)}
                  >
                    Remove
                  </button> */}
                    {/* <p>---------------------------------------------------------</p> */}
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
