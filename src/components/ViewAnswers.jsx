import React from "react";
import "../css/viewComments.css";
import { useState } from "react";
import { addAnswer, addComment } from "../services/productService";
import { toast } from "react-toastify";

const ViewAnswers = (props) => {
  const { answers, questionId, productId, reloadParent } = props;
  const [componentKey, setComponentKey] = useState(0);
  // const {reviewId} = props;
  const [data, setData] = useState({});

  const handleChangeAddAnswer = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAddAnswerClick = () => {
    addAnswer(productId, questionId, data)
      .then((res) => {
        console.log(res)
        reloadParent();
        console.log(reloadParent)
        toast.success("your answer successfully added");
        setComponentKey(componentKey + 1);
        // window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    console.log(data);
  };

  // console.log(replies)
  return (
    <>
      <div className="view-comments" key={componentKey}>
        {
          <div className>
            {answers?.map((answer, index) => {
              return (
                <>
                  <div className="view-comments-box">
                    <p>
                      <strong>answer: </strong>
                      {answer.answer}
                    </p>
                    <p>
                      <strong>username: </strong>
                      {answer.username}
                    </p>
                  </div>
                  <hr style={{ marginTop: "25px" }} className="hr" />
                </>
              );
            })}
            <textarea
              className="test-area"
              name="answer"
              id=""
              cols="30"
              rows="2"
              value={data?.answer}
              onChange={handleChangeAddAnswer}
              placeholder="add your answer"
            ></textarea>
            <br />
            <button className="product-button" onClick={handleAddAnswerClick}>
              add answer
            </button>
          </div>
        }
      </div>
    </>
  );
};

export default ViewAnswers;
