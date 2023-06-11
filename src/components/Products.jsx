import React, { useEffect, useState } from "react";
import {
  getAllProductsByOptionalFiltering,
  getCategories,
  getProducts,
} from "../services/productService";
import { toast } from "react-toastify";
import "../css/products.css";
import Product from "./Product";
import { useNavigate } from "react-router-dom";
import { getUsersMe } from "../services/userService";
import queryString from "query-string";

const Products = ({ props }) => {
  const { products, setProducts, paramObject, setParamObject } = props;
  const [categories, setCategories] = useState([]);
  // const [products, setProducts] = useState([]);

  const [data, setData] = useState({});
  // const [paramObject, setParamObject] = useState({
  //   pageNumber: "0",
  //   pageSize: "9",
  //   sortBy: "updatedAt",
  //   direction: "DESC",
  // });
  // const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const navigator = useNavigate();

  useEffect(() => {
    refreshCategories();
    handleApplySortingAndPagination(paramObject);
  }, []);

  const refreshCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res);
        // console.log(res)
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const refreshProducts = () => {
    const stringified = queryString.stringify(paramObject);
    getAllProductsByOptionalFiltering(stringified)
      .then((res) => {
        console.log(res);
        setProducts(res);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleApplySortingAndPagination = (paramObject) => {
    //state update problem
    // const stringified = queryString.stringify(paramObject);
    // console.log(paramObject.pageNumber);
    getAllProductsByOptionalFiltering(queryString.stringify(paramObject))
      .then((res) => {
        console.log(res)
        setProducts(res);
        // console.log(res);
        // toast.success("data filtered success");
      })
      .catch((err) => {
        toast.error("filter failed");
      });
  };

  const handleNextClick = () => {
    console.log("before-->" + paramObject.pageNumber);
    setParamObject((prevParamObject) => {
      const updatedParamObject = {
        ...prevParamObject,
        pageNumber: prevParamObject.pageNumber + 1,
      };
      console.log("after-->" + updatedParamObject.pageNumber);
      handleApplySortingAndPagination(updatedParamObject);
      return updatedParamObject;
    });
  };

  const handlePreviousClick = () => {
    console.log("before-->" + paramObject.pageNumber);
    setParamObject((prevParamObject) => {
      const updatedParamObject = {
        ...prevParamObject,
        pageNumber: prevParamObject.pageNumber - 1,
      };
      console.log("after-->" + updatedParamObject.pageNumber);
      handleApplySortingAndPagination(updatedParamObject);
      return updatedParamObject;
    });
  };

  // const handleNextClick = () => {
  //   setParamObject((prevParamObject) => {
  //     const updatedParamObject = {
  //       ...prevParamObject,
  //       pageNumber: prevParamObject.pageNumber + 1,
  //     };
  //     handleApplySortingAndPagination(updatedParamObject);
  //     return updatedParamObject;
  //   });
  // };
  
  
  
  
  
  
  
  

  // const handleNextClick = () => {
  //   // alert(products.pageNumber+1)
  //   setParamObject({
  //     ...paramObject,
  //     ["pageNumber"]: paramObject.pageNumber + 1,
  //   });
  //   // alert(products?.pageNumber);
  //   handleApplySortingAndPagination();
  // };

  // const handlePreviousClick = () => {
  //   // alert(products.pageNumber+1)
  //   setParamObject({
  //     ...paramObject,
  //     ["pageNumber"]: paramObject.pageNumber - 1,
  //   });
  //   // alert(products?.pageNumber);
  //   handleApplySortingAndPagination();
  // };

  return (
    <>
      <div className="categories">
        {categories?.map((item, index) => {
          return (
            <>
              <div className="categories-item">
                <img
                  src={item?.imageLink}
                  alt="err"
                  className="category-image"
                />
                <h2>{item.name}</h2>
              </div>
            </>
          );
        })}
      </div>
      <div className="products">
        {products?.result?.map((product, index) => {
          return (
            <>
              <div
                className="product-item"
                onClick={() => {
                  navigator(`/one-product/${product?.id}`);
                }}
              >
                <img
                  src={product?.productPhotoUrl}
                  alt=""
                  style={{ width: "10vw" }}
                />
                <div className="all-product-property">
                  <p style={{ fontSize: "20px", marginBottom: "5px" }}>
                    {product?.name}
                  </p>
                  <p>
                    <strong>Average Rating:</strong> {product?.averageRating}
                  </p>
                  <p className="">
                    <strong>Starts from: Rs.</strong> {product?.minimumPrice}/-
                  </p>
                  <p>
                    <strong>Description: </strong>
                    {product?.description.substring(0, 50) + "..."}
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="products-footer">
        <button
          className={
            paramObject?.pageNumber + 1 == 1
              ? "products-footer-btn-disable"
              : "products-footer-btn"
          }
          onClick={handlePreviousClick}
        >
          Previous
        </button>
        <button
          className={
            paramObject.pageNumber +1 ===
            Math.ceil(products.totalCount / products.pageSize)
              ? "products-footer-btn-disable"
              : "products-footer-btn"
          }
          onClick={handleNextClick}
        >
          Next
        </button>
        <p>
          page {parseInt(paramObject.pageNumber) + 1} of{" "}
          {Math.ceil(products.totalCount / products.pageSize)}
        </p>
        {
          // const pageNumber = paramObject.pageNumber;
          // console.log(parseInt(paramObject.pageNumber) + 1)
        }

        {console.log(
          "->" + Math.floor(products.totalCount / products.pageSize)
        )}
        {console.log("-->" + products?.pageNumber)}
      </div>
    </>
  );
};

export default Products;
