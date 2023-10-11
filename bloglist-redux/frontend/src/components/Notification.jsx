import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export const Notification = () => {
  const notif = useSelector((state) => state.notification);
  return (
    <div className="fixed top-24 w-full flex justify-center">
      <div
        className={`${notif[1]} w-fit  p-2 px-6 animate-bounce rounded-full`}
      >
        {notif[0]}
      </div>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};
