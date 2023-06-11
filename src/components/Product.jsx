import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addQuestion,
  addReview,
  deleteReview,
  getOneProduct,
  updateReview,
} from "../services/productService";
import "../css/product.css";
import ViewComments from "./ViewComments";
import { toast } from "react-toastify";
import ViewAnswers from "./ViewAnswers";
import { getUsersMe } from "../services/userService";

const Product = () => {
  const [product, setProduct] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const [isViewComment, setIsViewComment] = useState({});
  const [isEditReview, setIsEditReview] = useState(false);
  const [isDeleteReview, setIsDeleteReview] = useState(false);
  const [review, setReview] = useState({});
  const [question, setQuestion] = useState({});
  const [deleteReviewId, setDeleteReviewId] = useState("");
  const [productId, setProductId] = useState("");
  const [editReviewId, setEditReviewId] = useState("");
  const [updatedReviewPayload, setUpdatedReviewPayload] = useState({});

  // const [reviewToBeUpdated, setReviewToBeUpdated] = useState({});

  const handleReload = () => {
    // setReloadFlag(!reloadFlag);
    refreshProduct();
  };
  //this is product id
  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    refreshProduct();
    getCurrentUser();
    // console.log(product)
  }, []);

  const refreshProduct = () => {
    getOneProduct(id)
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
        console.log(res);
        setReview({
          comment: "",
        });

        // setReview({});
        refreshProduct();
        toast.success("your review successfully goes for appoval");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    console.log(review);
  };

  const handleChangeAddQuestion = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleAddQuestionClick = () => {
    console.log("hy");
    addQuestion(id, question)
      .then((res) => {
        refreshProduct();
        setQuestion({
          question: "",
        });
        // console.log(res);
        // window.location.reload();
        toast.success("your question successfully goes for approval");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    console.log(question);
  };

  const getCurrentUser = () => {
    getUsersMe()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleDeleteReview = () => {
    deleteReview(productId, deleteReviewId)
      .then((res) => {
        setProductId("");
        setDeleteReviewId("");
        setIsDeleteReview(false);
        refreshProduct();
        toast.success("review deleted succesfully");
      })
      .catch((err) => {
        toast.error("failed to delete review");
      });
  };

  const handleEditRatingChange = (value) => {
    // setRating(value);
    setUpdatedReviewPayload({ ...updatedReviewPayload, rating: value });
  };

  const handleChangeEditReview = (e) => {
    setUpdatedReviewPayload({
      ...updatedReviewPayload,
      [e.target.name]: e.target.value,
    });
  };

  const handleReviewEditSubmit = () => {
    updateReview(productId, editReviewId, updatedReviewPayload)
      .then((res) => {
        setProductId("");
        setEditReviewId("");
        setIsEditReview(false);
        setUpdatedReviewPayload({});
        refreshProduct();
      })
      .catch((err) => {
        toast.error("failed to update review");
      });
  };
  return (
    <>
      {/* dialog box for updating review */}
      {isEditReview ? (
        <>
          <div className="edit-review-end-user">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((value, index) => (
                <span
                  key={index}
                  className={
                    value <= updatedReviewPayload?.rating
                      ? "star filled"
                      : "star"
                  }
                  onClick={() => handleEditRatingChange(value)}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <textarea
              className="property-name-input"
              name="comment"
              id=""
              cols="30"
              rows="2"
              placeholder="add your review"
              value={updatedReviewPayload?.comment}
              onChange={handleChangeEditReview}
            ></textarea>
            <div>
              <button onClick={handleReviewEditSubmit} className="confirm-yes">
                Save
              </button>
              <button
                onClick={() => {
                  setProductId("");
                  setEditReviewId("");
                  setIsEditReview(false);
                  setUpdatedReviewPayload({});
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
      {/* dialog box for delete review confirmation */}
      {isDeleteReview ? (
        <>
          <div className="delete-confirm">
            <h4>Are you sure you want to delete</h4>
            <div>
              <button onClick={handleDeleteReview} className="confirm-yes">
                Yes
              </button>
              <button
                onClick={() => {
                  setIsDeleteReview(false);
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
      <h2 className="product-heading">Additional Information</h2>
      <div className="additional-info">
        <div>
          {product.additionalInfo &&
            Object.entries(product.additionalInfo).map(([key, value]) => (
              <>
                <div className="p-key">
                  <strong>{key}</strong>
                </div>
              </>
            ))}
        </div>
        <div>
          {product.additionalInfo &&
            Object.entries(product.additionalInfo).map(([key, value]) => (
              <>
                <div className="p-value">
                  <span>{value}</span>
                </div>
              </>
            ))}
        </div>
      </div>
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
            <div className="stars">
              {[1, 2, 3, 4, 5].map((value, index) => (
                <span
                  key={index}
                  className={value <= review?.rating ? "star filled" : "star"}
                  onClick={() => handleRatingChange(value)}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <textarea
              className="test-area"
              name="comment"
              id=""
              cols="30"
              rows="2"
              placeholder="add your review"
              value={review?.comment}
              onChange={handleChangeAddReview}
            ></textarea>
            <br />
            <button className="product-button" onClick={handleAddReviewClick}>
              add review
            </button>
            {product?.reviews?.map((review, index) => {
              return (
                <>
                  <div className="review-item">
                    <p>
                      <strong>Review:</strong> {review.comment}
                    </p>
                    <p>
                      <strong>Rating:</strong>{" "}
                      {
                        <div className="star">
                          {[1, 2, 3, 4, 5].map((value, index) => (
                            <span
                              key={index}
                              className={
                                value <= review?.rating ? "star filled" : "star"
                              }
                            >
                              &#9733;
                            </span>
                          ))}
                        </div>
                      }
                    </p>
                    <p>
                      <strong>Username:</strong>{" "}
                      {review?.userId === currentUser?.id
                        ? "'YOU'"
                        : review?.username}
                    </p>
                    {review?.userId === currentUser?.id && (
                      <>
                        <div className="edit-delete-review">
                          <button
                            className="edit-product"
                            onClick={(e) => {
                              setIsEditReview(true);
                              setEditReviewId(review?.id);
                              setProductId(product?.id);
                              setUpdatedReviewPayload({
                                comment: review?.comment,
                                rating: review?.rating,
                              });
                            }}
                          >
                            Edit Review
                          </button>
                          {/* <br /> */}
                          <button
                            className=" delete-product"
                            onClick={(e) => {
                              setIsDeleteReview(true);
                              setDeleteReviewId(review?.id);
                              setProductId(product?.id);
                            }}
                          >
                            Delete Review
                          </button>
                        </div>
                      </>
                    )}
                    <button
                      className={
                        isViewComment[review.id]
                          ? "product-button close-comments-button close-c"
                          : "product-button show-comments-button show-c"
                      }
                      onClick={() => {
                        handleViewCloseCommentButton(review.id);
                      }}
                    >
                      {isViewComment[review.id]
                        ? "close comments"
                        : "show comments"}
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
            <textarea
              className="test-area"
              name="question"
              id=""
              cols="30"
              rows="2"
              placeholder="ask your question"
              value={question?.question}
              onChange={handleChangeAddQuestion}
            ></textarea>
            <br />
            <button className="product-button" onClick={handleAddQuestionClick}>
              ask question
            </button>
            {product?.questions?.map((question, index) => {
              return (
                <>
                  <div className="review-item">
                    <p>
                      <strong>Question:</strong> {question?.question}
                    </p>
                    <p>
                      <strong>Username:</strong>{" "}
                      {question?.userId === currentUser?.id
                        ? "'YOU'"
                        : question?.username}
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

export default Product;
