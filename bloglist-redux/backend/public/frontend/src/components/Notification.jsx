import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { AiFillCheckCircle } from "react-icons/ai";
import { GoAlertFill } from "react-icons/go";

export const Notification = () => {
  const notif = useSelector((state) => state.notification);
  return (
    <>
      {notif.length > 0 && (
        <div className="fixed top-24 w-full z-10 flex justify-center max-w-[300px] sm:max-w-fit">
          <div
            className={`${notif[1]} w-fit px-6 animate-bounce rounded-lg  flex gap-2`}
          >
            {notif[1] === "success" ? (
              <div className="flex items-center text-white bg-lime-500 text-xl">
                <AiFillCheckCircle />
              </div>
            ) : notif[1] === "fail" ? (
              <div className="flex items-center text-white bg-red-600 text-xl">
                <GoAlertFill />
              </div>
            ) : null}
            <p className="p-2 text-white text-sm">{notif[0]}</p>
          </div>
        </div>
      )}
    </>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};
