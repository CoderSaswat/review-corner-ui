import React, { useEffect, useState } from "react";
import { getCategories, getProducts } from "../services/productService";
import { toast } from "react-toastify";
import "../css/products.css";
import Product from "./Product";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    refreshCategories();
    refreshProducts();
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
    getProducts()
      .then((res) => {
        console.log(res.result);
        setProducts(res.result);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

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
        {
            products?.map((product,index)=>{
                return(
                    <>
                        <div className="product-item" onClick={()=>{
                            navigator(`/one-product/${product?.id}`)
                        }}>
                            <img src={product?.productPhotoUrl} alt="" style={{"width":"10vw"}}/>
                            <div className="product-property">
                                <p style={{fontSize:"20px",marginBottom:"5px"}}>{product?.name}</p>
                                <p><strong>Average Rating:</strong> {product?.averageRating}</p>
                                <p><strong>Starts from: Rs.</strong> {product?.minimumPrice}/-</p>
                                <p><strong>Description: </strong>{product?.description.substring(0, 50) + "..."}</p>
                            </div>
                        </div>
                    </>
                )
            })
        }
      </div>
    </>
  );
};

export default Products;
