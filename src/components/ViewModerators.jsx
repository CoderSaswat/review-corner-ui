import React, { useEffect, useState } from "react";
import { getModerator, updateModeratorStatus } from "../services/userService";
import "../css/view-moderators.css";
import { toast } from "react-toastify";

const ViewModerators = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    refreshModerators();
  }, []);

  const refreshModerators = ()=>{
    getModerator()
    .then((res) => {
      setData(res);
      console.log(res);
      console.log(data);
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
  }

  const handleCheckboxChange = (id,isActive) => {
    console.log("ju")
    updateModeratorStatus(id,!isActive).then((res)=>{
        toast.success("status updated succesfully")
        refreshModerators();
    }).catch((err)=>{
        toast.error("error updating status")
    }
)};

  return (
    <>
      <div className="view-moderators">
        <table className="view-moderators-table">
          <thead style={{ backgroundColor: "black", color: "white" }}>
            <tr>
              <th style={{ width: "6%" }}>Photo</th>
              <th style={{ width: "20%" }}>Name</th>
              <th style={{ width: "50%" }}>Email</th>
              <th style={{ width: "12%" }}>Active/Deactive</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, index) => {
              return (
                <>
                  <tr>
                    <th>
                      <img
                        className="moderator-photo"
                        src={
                          user?.profileUrl
                            ? user?.profileUrl
                            : "https://thumbs.dreamstime.com/b/faceless-businessman-avatar-man-suit-blue-tie-human-profile-userpic-face-features-web-picture-gentlemen-85824471.jpg"
                        }
                        alt="error showing picture"
                      />
                    </th>
                    <th>{user?.name}</th>
                    <th>{user?.email}</th>
                    <th>
                      <input
                        type="checkbox"
                        checked={user.isActive}
                        onClick={(e)=>{
                            handleCheckboxChange(user.id,user.isActive)
                        }}
                      />
                    </th>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewModerators;
