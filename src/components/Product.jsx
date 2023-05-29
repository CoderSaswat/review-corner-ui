import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addQuestion,
  addReview,
  getOneProduct,
} from "../services/productService";
import "../css/product.css";
import ViewComments from "./ViewComments";
import { toast } from "react-toastify";
import ViewAnswers from "./ViewAnswers";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isViewComment, setIsViewComment] = useState({});
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
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={review?.rating}
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
                      <strong>Rating:</strong> {review.rating}
                    </p>
                    <p>
                      <strong>Username:</strong> {review.username}
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
              value={review?.comment}
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
                      <strong>Username:</strong> {question?.username}
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
