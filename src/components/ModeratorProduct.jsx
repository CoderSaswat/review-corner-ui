import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addQuestion,
  addReview,
  approveOrRejectQuestionByModerator,
  approveOrRejectReviewByModerator,
  getOneProduct,
  getOneProductByModerator,
} from "../services/productService";
import "../css/product.css";
import ViewComments from "./ViewComments";
import { toast } from "react-toastify";
import ViewAnswers from "./ViewAnswers";

const ModeratorProduct = () => {
  const [product, setProduct] = useState({});
  const handleReload = () => {
    // setReloadFlag(!reloadFlag);
    refreshProduct();
  };
  //this is product id
  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    refreshProduct();
  }, []);

  const refreshProduct = () => {
    getOneProductByModerator(id)
      .then((res) => {
        setProduct(res);
        // console.log(res)
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  //approve with answer
  const [data, setData] = useState({});


  const handleChangeWithAnswer = (e) => {
    // alert(data?.answer)
    setData({ ...data, [e.target.name]: e.target.value });

  };



  const handleApproveOrRjejectReview =(reviewId,status)=>{
    console.log(id)
    approveOrRejectReviewByModerator(id,reviewId,status).then((res)=>{
        refreshProduct();
        console.log(res);
        if(status === "APPROVED"){
            toast.success("review succesfully approved")
        }
        if(status==="REJECTED"){
            toast.success("review rejected")
        }
    }).catch((err)=>{
        console.log(err);
        toast.error(err.response.data.message);
    })
  }


  const handleApproveOrRjejectQuestion =(questionId,status)=>{
    console.log(data)
    approveOrRejectQuestionByModerator(id,questionId,status,data).then((res)=>{
        refreshProduct();
        console.log(res);
        if(status === "APPROVED"){
            toast.success("question succesfully approved")
        }
        if(status==="REJECTED"){
            toast.success("question rejected")
        }
    }).catch((err)=>{
        console.log(err);
        toast.error(err.response.data.message);
    })
  }
  return (
    <>
      <div className="product">
        <div>
          <img
            className="product-image"
            src={product?.productPhotoUrl}
            alt=""
          />
        </div>
        <div className="product-info">
          <div className="product-property">
            <p style={{ fontSize: "35px", marginBottom: "5px" }}>
              {product?.name}
            </p>
            <p>
              <strong>Average Rating:</strong> {product?.averageRating}
            </p>
            <p>
              <strong>Starts from: Rs.</strong> {product?.minimumPrice}/-
            </p>
            <p>
              <strong>Description: </strong>
              {product?.description}
            </p>
          </div>
        </div>
      </div>

      <div className="review-question">
        <div className="review-question-item">
          <h2 className="product-heading">Pending Reviews & Ratings</h2>
          <div className="reviews">
            {product?.reviews?.map((review, index) => {
              return (
                <>
                  <div className="review-item">
                    <p>
                      <strong>Review:</strong> {review.comment}
                    </p>
                    <p>
                      <strong>Rating:</strong> {review.rating}
                    </p>
                    <p>
                      <strong>Username:</strong> {review.username}
                    </p>
                    <p>
                      <strong>Status:</strong> {review.approvalStatus}
                    </p>
                    <div className="approve-reject-button">
                      <button className="approve btn-hover" onClick={()=>handleApproveOrRjejectReview(review?.id,"APPROVED")}>approve</button>
                      <button className="reject btn-hover" onClick={()=>handleApproveOrRjejectReview(review?.id,"REJECTED")}>reject</button>
                    </div>
                  </div>
                  <hr style={{ marginTop: "25px" }} className="hr" />
                </>
              );
            })}
          </div>
        </div>
        <div className="review-question-item">
          <h2 className="product-heading qna">Pending Questions & Answers</h2>
          <div className="reviews">
            {product?.questions?.map((question, index) => {
              return (
                <>
                  <div className="review-item">
                    <p>
                      <strong>Question:</strong> {question?.question}
                    </p>
                    <p>
                      <strong>Username:</strong> {question?.username}
                    </p>
                    <p>
                      <strong>Status:</strong> {question?.approvalStatus}
                    </p>
                    <div className="approve-reject-button">
                    <textarea name="answer" id="" cols="30" rows="2" placeholder="enter the answer" value={data?.question?.id} onChange={handleChangeWithAnswer}></textarea>
                    <br />
                      <button className="approve btn-hover" onClick={()=>handleApproveOrRjejectQuestion(question?.id,"APPROVED")}>approve</button>
                      <button className="reject btn-hover" onClick={()=>handleApproveOrRjejectQuestion(question?.id,"REJECTED")}>reject</button>
                      <button className="approve approve-with-answer btn-hover" onClick={()=>handleApproveOrRjejectQuestion(question?.id,"APPROVED")}>approve with answer</button>
                    </div>
                  </div>
                  <hr style={{ marginTop: "25px" }} className="hr" />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModeratorProduct;
