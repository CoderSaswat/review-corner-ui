import React, { useEffect } from "react";
import "../css/viewComments.css";
import { useState } from "react";
import { addComment } from "../services/productService";
import { toast } from "react-toastify";
import { getUsersMe } from "../services/userService";

const ViewComments = (props) => {
  const { replies, reviewId, productId, reloadParent } = props;
  const [componentKey, setComponentKey] = useState(0);
  const [currentUser, setCurrentUser] = useState('')
  // const {reviewId} = props;
  const [data, setData] = useState({});

  useEffect(() => {
    getCurrentUser();
  }, [])

  const getCurrentUser = ()=>{
    getUsersMe().then((res)=>{
      setCurrentUser(res);
    }).catch((err)=>{
      toast.error(err.response.data.message);
    })
  }
  

  const handleChangeAddReply = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAddReplyClick = () => {
    addComment(productId, reviewId, data)
      .then((res) => {
        // console.log(res)
        reloadParent();
        setData({
          "reply":"",
        })
        // console.log(reloadParent)
        toast.success("your comment successfully added");
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
            {replies?.map((reply, index) => {
              return (
                <>
                  <div className="view-comments-box">
                    <p>
                      <strong>comment: </strong>
                      {reply.reply}
                    </p>
                    <p>
                      <strong>username: </strong>
                      {reply?.userId === currentUser?.id ? "'YOU'":reply?.username}
                    </p>
                  </div>
                  <hr style={{ marginTop: "25px" }} className="hr" />
                </>
              );
            })}
            <textarea
              className="test-area"
              name="reply"
              id=""
              cols="30"
              rows="2"
              value={data?.reply}
              onChange={handleChangeAddReply}
              placeholder="add your comment"
            ></textarea>
            <br />
            <button className="product-button" onClick={handleAddReplyClick}>
              add comment
            </button>
          </div>
        }
      </div>
    </>
  );
};

export default ViewComments;
