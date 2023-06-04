import React, { useEffect, useState } from "react";
import { getCategories, getProducts, getProductsByAdmin, getProductsByModerator } from "../services/productService";
import { toast } from "react-toastify";
import "../css/products.css";
import Product from "./Product";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    refreshProducts();
  }, []);


  const refreshProducts = () => {
    getProductsByAdmin()
      .then((res) => {
        console.log(res);
        setProducts(res);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <div className="products">
        {
            products?.map((product,index)=>{
                return(
                    <>
                        <div className="product-item" onClick={()=>{
                            navigator(`/one-product-admin/${product?.id}`)
                        }}>
                            <img src={product?.productPhotoUrl} alt="" style={{"width":"10vw"}}/>
                            <div className="all-product-property">
                                <p style={{fontSize:"20px",marginBottom:"5px"}}>{product?.name}</p>
                                <p><strong>Average Rating:</strong> {!product?.averageRating && '0'}</p>
                                <p><strong>Starts from: Rs.</strong> {product?.minimumPrice}/-</p>
                                <p><strong>Description: </strong>{product?.description.substring(0, 30) + "..."}</p>
                                <button className="edit-product" onClick={(e)=>{
                                  e.stopPropagation();
                                  navigator(`/edit-product-admin/${product?.id}`)
                                }}>Edit Product</button>
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

export default AdminProducts;
