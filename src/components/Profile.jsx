import React, { useState, useEffect } from "react";
import { fetchData } from "../firebase/api/get_user";
import ErrorImg from "../assets/profile.jpeg";
import Model from "../components/Model";

function Profile() {
  const [showDialog, setShowDialog] = useState(false);
  const [userData, setUserData] = useState([]);

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    const getUserData = async () => {
      const users = await fetchData();
      if (users && users.length > 0) {
        setUserData(users);
      }
    };

    getUserData();
  }, []);

  if (userData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {userData.map((data) => (
        <div className="Card" key={data.id}>
          <img src={ErrorImg} alt="img" />
          <h3>{data.name || "No Name"}</h3>
          <p>Phone: {data.phone}</p>
          <button onClick={openDialog}>Send Notification</button>
          {showDialog && (
            <Model
              onClose={closeDialog}
              fcmToken={data.fcm_token || ""}
            />
          )}
        </div>
      ))}
    </>
  );
}

export default Profile;
