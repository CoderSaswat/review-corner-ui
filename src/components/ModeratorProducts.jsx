import React, { useEffect, useState } from "react";
import { getCategories, getProducts, getProductsByModerator } from "../services/productService";
import { toast } from "react-toastify";
import "../css/products.css";
import Product from "./Product";
import { useNavigate } from "react-router-dom";

const ModeratorProducts = () => {
  const [products, setProducts] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    refreshProducts();
  }, []);


  const refreshProducts = () => {
    getProductsByModerator()
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
                            navigator(`/one-product-moderator/${product?.id}`)
                        }}>
                            <img src={product?.productPhotoUrl} alt="" style={{"width":"10vw"}}/>
                            <div className="product-property">
                                <p style={{fontSize:"20px",marginBottom:"5px"}}>{product?.name}</p>
                                <p><strong>Average Rating:</strong> {product?.averageRating}</p>
                                <p><strong>Starts from: Rs.</strong> {product?.minimumPrice}/-</p>
                                <p><strong>Pending Reviews: </strong> {product?.pendingReviews}</p>
                                <p><strong>Pending Questions: </strong> {product?.pendingQuestions}</p>
                                {/* <p><strong>Description: </strong>{product?.description.substring(0, 50) + "..."}</p> */}
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

export default ModeratorProducts;
