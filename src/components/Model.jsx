import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import "../styles/Model.css";
import { sendNotification } from "../firebase/api/send_notification"; 

function Model({ onClose, fcmToken }) {
  const [message, setMessage] = useState(""); 

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      alert("Please enter a message.");
      return;
    }
    try {
      await sendNotification(fcmToken, "Admin Notification", message);
      alert("Notification sent successfully!");
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification.");
    }
    onClose(); // Close the modal after sending the notification
  };

  return (
    <div className="model-overlay">
      <div className="model-container">
        <AiFillCloseCircle size={26} className="close-icon" onClick={onClose} />
        <p>Send Notification</p>
        {/* <p className="fcm-token">{fcmToken}</p> */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here"
          className="message-input"
        />
        <button onClick={handleUpdate} type="button">
          Send
        </button>
      </div>
    </div>
  );
}

export default Model;
