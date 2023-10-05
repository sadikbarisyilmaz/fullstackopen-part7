import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const Notification = () => {
  const [notification, setNotification] = useContext(NotificationContext);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  };

  if (!notification) return null;
  setTimeout(() => {
    setNotification(null);
  }, 5000);
  return <div style={style}>{notification}</div>;
};

export default Notification;
