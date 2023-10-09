import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export const Notification = () => {
  const notif = useSelector((state) => state.notification);

  return <div className={notif[1]}>{notif}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};
