import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { AiFillCheckCircle } from "react-icons/ai";
import { GoAlertFill } from "react-icons/go";

export const Notification = () => {
  const notif = useSelector((state) => state.notification);

  return (
    <div className="fixed -z-10 top-24 w-full flex justify-center ">
      <div
        className={`${notif[1]} w-fit  px-6 animate-bounce rounded-lg bg-white flex gap-2`}
      >
        {notif[1] === "success" ? (
          <div className="flex items-center text-lime-500 text-xl ">
            <AiFillCheckCircle />
          </div>
        ) : notif[1] === "fail" ? (
          <div className="flex items-center text-red-600 text-xl">
            <GoAlertFill />
          </div>
        ) : null}
        <p className="p-2 text-sm">{notif[0]}</p>
      </div>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};
