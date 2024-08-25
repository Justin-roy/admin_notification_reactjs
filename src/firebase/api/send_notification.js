// src/api/sendNotification.js
export const sendNotification = async (token, title, subject) => {
    const response = await fetch("https://backend-admin-notification-iajt.vercel.app/api/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        title: title,
        subject: subject,
      }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to send notification");
    }
  
    return await response.json();
  };
  