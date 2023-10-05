import { createContext, useState } from "react";
const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState("");

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
