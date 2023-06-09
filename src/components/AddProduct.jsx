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
  // const [additionalInfo, setAdditionalInfo] = useState([
  //   {
  //     key: "",
  //     value: "",
  //   },
  // ]);

  //form data

  //methods

  // const handleChangeAdditionalInfo = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

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

  // addtionalinfo0

  // const [currentKey, setCurrentKey] = useState("");
  // const [currentValue, setCurrentValue] = useState("");
  // const [formData, setFormData] = useState({});
  // const [additionalFields, setAdditionalFields] = useState([
  //   {
  //     key: "",
  //     value: "",
  //   },
  // ]);

  // const handleAddFieldAdditionalInfo = () => {
  //   setFormData({
  //     ...formData,
  //     [currentKey]: currentValue,
  //   });
  //   setAdditionalFields([
  //     ...additionalFields,
  //     {
  //       key: "",
  //       value: "",
  //     },
  //   ]);
  // };

  // const handleChangeAdditionalInfoKey = (e, index) => {
  //   const { name, value } = e.target;
  //   setCurrentKey(value);
  //   const newFileds = [...additionalFields];
  //   newFileds[index] = { ...newFileds[index], [name]: value };
  //   setAdditionalFields(newFileds);
  //   setFormData({
  //     ...formData,
  //     [name]: "",
  //   });
  // };

  // const handleChangeAdditionalInfoValue = (e, index) => {
  //   const { name, value } = e.target;
  //   setCurrentValue(value);
  //   const newFileds = [...additionalFields];
  //   newFileds[index] = { ...newFileds[index], [name]: value };
  //   setAdditionalFields(newFileds);
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleSubmitAdditionalInfo = async () => {
    // alert("api call");
    // additionalFields?.map((item,index)=>(
    //   setFormData(...formData,{
    //     [item.key]:item.value
    //   })
    // ))
    // additionalFields.forEach((item, index) => {
    //   // console.log(`Item at index ${index}: ${item}`);
    //   setFormData(...formData, {
    //     [item?.key]: item?.value,
    //   });
    // });
  };

  // {/* addtionalInfo2 */}

  // const [productDetails, setProductDetails] = useState({});

  // const handleInputChange = (key, value) => {
  //   setProductDetails(prevState => ({
  //     ...prevState,
  //     [key]: value
  //   }));
  // };

  // const removeDetail = key => {
  //   setProductDetails(prevState => {
  //     const updatedDetails = { ...prevState };
  //     delete updatedDetails[key];
  //     return updatedDetails;
  //   });
  // };

  // const addDetail = () => {
  //   const newKey = prompt('Enter the key');
  //   const newValue = prompt('Enter the value');
  //   if (newKey && newValue) {
  //     setProductDetails(prevState => ({
  //       ...prevState,
  //       [newKey]: newValue
  //     }));
  //   }
  // };

  // {/* addtionalInfo3 */}

  // const [productDetails, setProductDetails] = useState({});

  // const handleInputChange = (key, value) => {
  //   setProductDetails((prevState) => ({
  //     ...prevState,
  //     [key]: value,
  //   }));
  // };

  // const removeDetail = (key) => {
  //   setProductDetails((prevState) => {
  //     const updatedDetails = { ...prevState };
  //     delete updatedDetails[key];
  //     return updatedDetails;
  //   });
  // };

  // const addDetail = () => {
  //   const newKey = prompt("Enter the key");
  //   if (newKey) {
  //     const newValue = prompt("Enter the value");
  //     if (newValue) {
  //       setProductDetails((prevState) => ({
  //         ...prevState,
  //         [newKey]: newValue,
  //       }));

  //       setData({...data,["additionalInfo"]:productDetails});
  //     }
  //   }
  // };



  // additonalInfo4
  const [isAddAdditionalInfo, setIsAddAdditionalInfo] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState({});
  const [currentKey, setCurrentKey] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [productDetalsData, setProductDetailsData] = useState({});

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
      setAdditionalInfo({ ...additionalInfo, [currentKey]: currentValue });
    }
    setCurrentKey("");
    setCurrentValue("");
    setIsAddAdditionalInfo(false);
    setProductDetailsData({});
    // const copyObject = {...additionalInfo}
    setData({...data,["additionalInfo"]:additionalInfo});
  };

  const handleEditAdditionalInfoProperyValue = (key, value) => {
    setAdditionalInfo({ ...additionalInfo, [key]: value });
  };

  const handleEditAdditionalInfoProperyName = (key, value) => {};

  const removeOneAdditionalProductDetails = (key) => {
    const updatedAdditionalInfo = { ...additionalInfo };
    delete updatedAdditionalInfo[key];
    setAdditionalInfo(updatedAdditionalInfo);
  };

  return (
    <>
      {isAddAdditionalInfo ? (
        <>
          <div className="delete-confirm">
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
          {/* //additionalInfo1 */}
          <br />
          {/* {
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {additionalFields?.map((field, index) => (
                <div key={index}>
                  <input
                    type="text"
                    name="key"
                    value={field?.key}
                    onChange={(e) => {
                      handleChangeAdditionalInfoKey(e, index);
                    }}
                  />
                  <br />
                  <input
                    type="text"
                    name="value"
                    value={field?.value}
                    onChange={(e) => {
                      handleChangeAdditionalInfoValue(e, index);
                    }}
                  />

                  <br />
                  <br />
                </div>
              ))}
              <button type="button" onClick={handleAddFieldAdditionalInfo}>
                Add More
              </button>
              <button type="button" onClick={handleSubmitAdditionalInfo}>
                Submit
              </button>
            </form>
          } */}
          {/* addtionalInfo2 */}
          {/* {
                <div>
                {Object.entries(productDetails).map(([key, value]) => (
                  <div key={key}>
                    <input
                      type="text"
                      value={key}
                      onChange={e => handleInputChange(e.target.value, key)}
                    />
                    <br />
                    <input
                      type="text"
                      value={value}
                      onChange={e => handleInputChange(key, e.target.value)}
                    />
                    <button onClick={() => removeDetail(key)}>Remove</button>
                    <br /><br />
                  </div>
                  
                ))}
                <button onClick={addDetail}>Add more details</button>
              </div>
          } */}

          {/* addtionalInfo3 */}
          {/* <div>
            {Object.entries(productDetails).map(([key, value]) => (
              <div key={key}>
                <input
                  type="text"
                  value={key}
                  onChange={(e) => handleChange(key,e.target.value)}
                  readonly
                />
                <br />
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleInputChange(key, e.target.value)
                  }
                />
                <button onClick={() => removeDetail(key)}>
                  Remove
                </button>
                <br />
                <br />
              </div>
            ))}
            <button onClick={addDetail}>Add more details</button>
          </div> */}

          {/* additionalInfo4 */}

          <div>
            {Object.entries(additionalInfo).map(([key, value]) => (
              <div key={key}>
                <input
                  type="text"
                  value={key}
                  className="sign-up-input-field"
                  // onChange={(e) => handleChange(key,e.target.value)}
                  readonly
                />
                <br />
                <input
                  type="text"
                  value={value}
                  className="sign-up-input-field"
                  // onChange={(e) =>
                  //   handleInputChange(key, e.target.value)
                  // }
                />
                <button onClick={() => removeOneAdditionalProductDetails(key)}>
                  Remove
                </button>
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
