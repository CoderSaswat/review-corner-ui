import React, { useEffect, useState } from "react";
import "../css/navbar.css";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAllProductsByOptionalFiltering,
  getCategories,
  getProducts,
} from "../services/productService";
import queryString from "query-string";

export default function Navbar({ props }) {
  const { currentUser, setCurrentUser, products, setProducts, paramObject,setParamObject } = props;
  const [isfilterClicked, setIsfilterClicked] = useState(false);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [products, setProducts] = useState([])
  const location = useLocation();

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res);
      })
      .catch((err) => {
        toast.error("error fetching categories");
      });
  }, []);

  useEffect(() => {
    setSelectedCategory("");
  }, []);

  const handleChange = (e) => {
    setParamObject({ ...paramObject, [e.target.name]: e.target.value });
  };

  const handleApplyfilter = () => {
    const stringified = queryString.stringify(paramObject);
    getAllProductsByOptionalFiltering(stringified)
      .then((res) => {
        setProducts(res);
        console.log(products);
        setIsfilterClicked(!isfilterClicked);
        toast.success("data filtered success");
      })
      .catch((err) => {
        toast.error("filter failed");
      });
  };

  //state update problem
  // const handleClearfilter = () => {
  //   setData({});
  //   const stringified = queryString.stringify(data);
  //   getAllProductsByOptionalFiltering(stringified)
  //     .then((res) => {
  //       setProducts(res?.result);
  //       console.log(res?.result);
  //       setIsfilterClicked(!isfilterClicked);
  //       toast.success("filter clear success");
  //     })
  //     .catch((err) => {
  //       toast.error("filter clear failed");
  //     });
  // };

  // const handleClearfilter = async () => {
  //   setData({}); // Update the state with an empty object
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for the state to update
  //     const stringified = queryString.stringify(data);
  //     const res = await getAllProductsByOptionalFiltering(stringified);
  //     setProducts(res?.result);
  //     console.log(res?.result);
  //     setIsfilterClicked(!isfilterClicked);
  //     toast.success("filter clear success");
  //   } catch (err) {
  //     toast.error("filter clear failed");
  //   }
  // };

  // const handleClearfilter = () => {
  //   setData({}); // Update the state with an empty object
  //   setData({}, () => {
  //     const stringified = queryString.stringify(data);
  //     getAllProductsByOptionalFiltering(stringified)
  //       .then((res) => {
  //         setProducts(res?.result);
  //         console.log(res?.result);
  //         setIsfilterClicked(!isfilterClicked);
  //         toast.success("filter clear success");
  //       })
  //       .catch((err) => {
  //         toast.error("filter clear failed");
  //       });
  //   });
  // };

  // const handleClearfilter = () => {
  //   setData({}); // Update the state with an empty object
  // };
  // useEffect(() => {
  //   const stringified = queryString.stringify(data);
  //   getAllProductsByOptionalFiltering(stringified)
  //     .then((res) => {
  //       setProducts(res?.result);
  //       console.log(res?.result);
  //       setIsfilterClicked(!isfilterClicked);
  //       toast.success("filter clear success");
  //     })
  //     .catch((err) => {
  //       toast.error("filter clear failed");
  //     });
  // }, [data]);

  // const updateDataState = (newData) => {
  //   return new Promise((resolve) => {
  //     setData(newData, () => {
  //       resolve();
  //     });
  //   });
  // };

  // const handleClearfilter = async () => {
  //   setData({}); // Update the state with an empty object
  //   await updateDataState({}); // Wait for the state to be updated
  //   // Perform actions that depend on the updated state here
  //   const stringified = queryString.stringify(data);
  //   getAllProductsByOptionalFiltering(stringified)
  //     .then((res) => {
  //       setProducts(res?.result);
  //       console.log(res?.result);
  //       setIsfilterClicked(!isfilterClicked);
  //       toast.success("filter clear success");
  //     })
  //     .catch((err) => {
  //       toast.error("filter clear failed");
  //     });
  // };

  const handleClearfilter = () => {
    const stringified = queryString.stringify({});
    getAllProductsByOptionalFiltering(stringified)
      .then((res) => {
        setProducts(res);
        // console.log(res?.result);
        setParamObject({
          "pageNumber" : "0",
          "pageSize" : "9",
          "sortBy" : "createdAt",
          "direction" :"ASC"
        });
        setIsfilterClicked(!isfilterClicked);
        toast.success("filter clear success");
      })
      .catch((err) => {
        toast.error("filter clear failed");
      });
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setIsfilterClicked({ ...paramObject, [e.target.name]: e.target.value });
  };

  // const handleSearchOnChange =(e) => {
  // //state update prblem
  // setData({ ...data, ["searchInput"]: e.target.value });
  // const stringified = queryString.stringify(data);
  // getAllProductsByOptionalFiltering(stringified)
  //   .then((res) => {
  //     setProducts(res?.result);
  //   })
  //   .catch((err) => {
  //     toast.error("search failed");
  //   });
  // }

  // const handleSearchOnChange = (e)  => {
  //   //state update prblem
  //   setParamObject({ ...paramObject, ["searchInput"]: e.target.value });
  //   const stringified = queryString.stringify(paramObject);
  //   //  getAllProductsByOptionalFiltering(`searchInput=${e.target.value}`)
  //   getAllProductsByOptionalFiltering(stringified)
  //     .then((res) => {
  //       setProducts(res);
  //     })
  //     .catch((err) => {
  //       toast.error("search failed");
  //     });
  //   }

    const handleSearchOnChange = (e) => { 
      setParamObject((prevParamObject) => {
        const updatedParamObject = { ...prevParamObject, searchInput: e.target.value };
        const stringified = queryString.stringify(updatedParamObject);
        getAllProductsByOptionalFiltering(stringified)
          .then((res) => {
            setProducts(res);
          })
          .catch((err) => {
            toast.error("Search failed");
          });
        return updatedParamObject;
      });
    };

  
  return (
    <>
      {isfilterClicked ? (
        <>
          <div className="filter-box">
            <label htmlFor="minPrice">Minimum Price</label>
            <input
              type="number"
              name="minPrice"
              value={paramObject?.minPrice}
              onChange={handleChange}
            />
            <label htmlFor="maxPrice">Maximun Price</label>
            <input
              type="number"
              name="maxPrice"
              value={paramObject?.maxPrice}
              onChange={handleChange}
            />
            <label htmlFor="minRating">Minimum Rating</label>
            <input
              type="number"
              name="minRating"
              value={paramObject?.minRating}
              onChange={handleChange}
            />
            <label htmlFor="maxRating">Maximun Rating</label>
            <input
              type="number"
              name="maxRating"
              value={paramObject?.maxRating}
              onChange={handleChange}
            />
            <label htmlFor="categoryId">Category: </label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              name="categories"
            >
              {selectedCategory === "" && <option value="">Select</option>}
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button className="filter-apply-btn" onClick={handleApplyfilter}>
              apply
            </button>
            <button className="filter-apply-btn" onClick={handleClearfilter}>
              clear filter
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="navbar">
        <div className="navbar-item">Review Corner</div>
        {currentUser?.role === "ADMIN" ? (
          <>
            <div className="login-signup">
              <Link to={"/view-moderators"}>
                <button className="login-signup-button moderator-button">
                  View Moderators
                </button>
              </Link>
              <Link to={"/add-moderators"}>
                <button className="login-signup-button moderator-button">
                  Add Moderators
                </button>
              </Link>
              <Link to={"/admin-products"}>
                <button className="login-signup-button moderator-button">
                  View Products
                </button>
              </Link>
              <Link to={"/add-product"}>
                <button className="login-signup-button moderator-button">
                  Add Product
                </button>
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
              {(location.pathname === "/all-products") && (
                <button
                  className="filter-button"
                  onClick={() => {
                    setIsfilterClicked(!isfilterClicked);
                  }}
                >
                  Filter
                </button>
              )}
              {(location.pathname === "/all-products") && (
                <input
                  type="text"
                  placeholder="Search"
                  style={{ padding: "5px", borderRadius: "10px solid black" }}
                  onChange={handleSearchOnChange}
                />
              )}

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
