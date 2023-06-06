import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  addQuestion,
  addReview,
  deleteProduct,
  deleteQuestion,
  deleteReview,
  getOneProduct,
  getOneProductByAdmin,
} from "../services/productService";
import "../css/product.css";
import ViewComments from "./ViewComments";
import { toast } from "react-toastify";
import ViewAnswers from "./ViewAnswers";

const AdminProduct = () => {
  const [product, setProduct] = useState({});
  const [isViewComment, setIsViewComment] = useState({});

  const [isDeleteProduct, setIsDeleteProduct] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");
  const [isDeleteReview, setIsDeleteReview] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState("");
  const [isDeleteQuestion, setIsDeleteQuestion] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState("");

  const navigator = useNavigate();

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
    getOneProductByAdmin(id)
      .then((res) => {
        setProduct(res);
        // console.log(res)
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const handleViewCloseCommentButton = (reviewId) => {
    if (isViewComment[reviewId]) {
      // console.log(isViewComment);
      setIsViewComment({ ...isViewComment, [reviewId]: false });
      // console.log(isViewComment);
    } else {
      // console.log(isViewComment);
      setIsViewComment({ ...isViewComment, [reviewId]: true });
      // console.log(isViewComment);
    }
  };

  const [review, setReview] = useState({});

  const handleRatingChange = (value) => {
    // setRating(value);
    setReview({ ...review, rating: value });
  };

  const handleChangeAddReview = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleAddReviewClick = () => {
    addReview(id, review)
      .then((res) => {
        refreshProduct();
        console.log(res);
        // window.location.reload();
        toast.success("your review successfully goes for appoval");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    console.log(review);
  };

  const [question, setQuestion] = useState({});

  const handleChangeAddQuestion = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleAddQuestionClick = () => {
    addQuestion(id, question)
      .then((res) => {
        console.log(res);
        // window.location.reload();
        toast.success("your question successfully goes for appoval");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    console.log(question);
  };

  const handleConfirmDelete = () => {
    if (isDeleteProduct) {
      deleteProduct(deleteProductId)
        .then((res) => {
          setIsDeleteProduct(false);
          setDeleteProductId("");
          navigator("/admin-products");
          toast.success("product successfully deleted");
        })
        .catch((err) => {
          toast.error("failed to delete product");
        });
    } else if (isDeleteReview) {
      deleteReview(deleteProductId,deleteReviewId).then((res)=>{
        setDeleteProductId('');
        setDeleteReviewId('');
        setIsDeleteReview(false);
        refreshProduct();
        toast.success("review deleted")
      }).catch((err)=>{
        toast.error("failed to delete review")
      })
    }
    else if(isDeleteQuestion){
      deleteQuestion(deleteProductId,deleteQuestionId).then((res)=>{
        setDeleteProductId('');
        setDeleteQuestionId('');
        setIsDeleteQuestion(false);
        refreshProduct();
        toast.success("question deleted")
      }).catch((err)=>{
        toast.error("failed to delete question")
      })
    }
  };
  return (
    <>
      {isDeleteProduct || isDeleteReview || isDeleteQuestion ? (
        <>
          <div className="delete-confirm">
            <h3>Are you sure you want to delete</h3>
            <div>
              <button onClick={handleConfirmDelete} className="confirm-yes">
                Yes
              </button>
              <button
                onClick={() => {
                  setIsDeleteProduct(false);
                  setIsDeleteReview(false);
                  setIsDeleteQuestion(false);
                }}
                className="confirm-no"
              >
                No
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
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
      <button
        className="edit-product edit-product-admin-product-page"
        onClick={(e) => {
          navigator(`/edit-product-admin/${product?.id}`);
        }}
      >
        Edit Product
      </button>
      <button
        className=" delete-product"
        onClick={(e) => {
          e.stopPropagation();
          // navigator(`/edit-product-admin/${product?.id}`);
          setDeleteProductId(product?.id);
          setIsDeleteProduct(true);
        }}
      >
        Delete Product
      </button>
      <h2 className="product-heading">Prices from different Companies</h2>
      <div className="prices">
        {product?.prices?.map((price, index) => {
          return (
            <>
              <div className="prices-item">
                <p>
                  <strong>Company Name:</strong> {price.company}
                </p>
                <div className="company-logo-div">
                  <span>
                    <strong>Company Logo:</strong>
                  </span>{" "}
                  <img
                    className="company-logo"
                    src={price.companyLogoUrl}
                    alt="err"
                  />
                </div>
                <p>
                  <strong>Price: Rs.</strong>
                  {price.price}/-
                </p>
                <a href={price.productLink}>click here to go to product</a>
                <hr style={{ marginTop: "25px" }} className="hr" />
              </div>
            </>
          );
        })}
      </div>
      <div className="review-question">
        <div className="review-question-item">
          <h2 className="product-heading">Reviews & Ratings</h2>
          <div className="reviews">
            {product?.reviews?.map((review, index) => {
              let style = null;
              if (review?.approvalStatus === "APPROVED") {
                style = {
                  color: "green",
                };
              } else if (review?.approvalStatus === "REJECTED") {
                style = {
                  color: "RED",
                };
              } else {
                style = {
                  color: "orange",
                };
              }
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
                      <strong>Status:</strong>{" "}
                      <span style={style}>{review.approvalStatus}</span>
                    </p>
                    <button
                      className={
                        isViewComment[review.id]
                          ? "product-button close-comments-button"
                          : "product-button show-comments-button"
                      }
                      onClick={() => {
                        handleViewCloseCommentButton(review.id);
                      }}
                    >
                      {isViewComment[review.id]
                        ? "close comments"
                        : "show comments"}
                    </button>
                    <button
                      className=" delete-product"
                      onClick={(e) => {
                        e.stopPropagation();
                        // navigator(`/edit-product-admin/${product?.id}`);
                        setDeleteProductId(product?.id);
                        setDeleteReviewId(review?.id);
                        setIsDeleteReview(true);
                      }}
                    >
                      Delete Review
                    </button>
                    {isViewComment[review.id] && (
                      <ViewComments
                        replies={review?.replies}
                        reviewId={review?.id}
                        productId={id}
                        reloadParent={handleReload}
                      />
                    )}
                  </div>
                  <hr style={{ marginTop: "25px" }} className="hr" />
                </>
              );
            })}
          </div>
        </div>
        <div className="review-question-item">
          <h2 className="product-heading qna">Questions & Answers</h2>
          <div className="reviews">
            {product?.questions?.map((question, index) => {
              let style = null;
              if (question?.approvalStatus === "APPROVED") {
                style = {
                  color: "green",
                };
              } else if (question?.approvalStatus === "REJECTED") {
                style = {
                  color: "RED",
                };
              } else {
                style = {
                  color: "orange",
                };
              }
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
                      <strong>Status:</strong>{" "}
                      <span style={style}>{question.approvalStatus}</span>
                    </p>
                    <button
                      className={
                        isViewComment[question.id]
                          ? "product-button close-comments-button"
                          : "product-button show-comments-button"
                      }
                      onClick={() => {
                        handleViewCloseCommentButton(question.id);
                      }}
                    >
                      {isViewComment[question.id]
                        ? "close answers"
                        : "show answers"}
                    </button>
                    <button
                      className="delete-product"
                      onClick={(e) => {
                        e.stopPropagation();
                        // navigator(`/edit-product-admin/${product?.id}`);
                        setDeleteProductId(product?.id);
                        setDeleteQuestionId(question?.id);
                        setIsDeleteQuestion(true);
                      }}
                    >
                      Delete Question
                    </button>
                    {isViewComment[question.id] && (
                      <ViewAnswers
                        answers={question?.answers}
                        questionId={question?.id}
                        productId={id}
                        reloadParent={handleReload}
                      />
                    )}
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

export default AdminProduct;
