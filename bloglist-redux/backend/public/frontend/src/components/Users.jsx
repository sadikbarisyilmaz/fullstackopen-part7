import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PleaseLogin } from "./PleaseLogin";
import { Loader } from "./Loader";

export const Users = ({ users, loggedUser, showNotification }) => {
  const navigate = useNavigate();
  console.log(users);
  if (!loggedUser) {
    return <PleaseLogin />;
  }
  return (
    <div className="grow bg-[#fffdfa] px-6 md:px-32 pt-32 pb-4">
      <h1 className="p-4 text-3xl md:text-6xl text-[#ff5a19]">User Stats</h1>
      {users.length > 0 ? (
        <div className="animate-fadeIn flex flex-col  w-full">
          <div className="sm:p-4 shadow-xl">
            <div className="rounded-lg border border-gray-200">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white  text-sm">
                <thead className="ltr:text-left rtl:text-right">
                  <tr>
                    <th className="px-2 sm:px-4 py-2 font-medium text-gray-900">
                      User Name
                    </th>
                    <th className="px-2 sm:px-4 py-2 font-medium text-gray-900">
                      Name
                    </th>
                    <th className="px-2 sm:px-4 py-2 font-medium text-gray-900">
                      Number of Blogs
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 [&>*:nth-child(odd)]:bg-gray-100 [&>*:nth-child(even)]:bg-white">
                  {users &&
                    [...users].map((user, i) => {
                      return (
                        <tr className=" text-xsmd:text-sm" key={i}>
                          <td className="px-2 sm:px-4 py-2 font-medium text-gray-900">
                            <Link to={`/users/${user.id}`}>
                              <div className=" flex justiw-full">
                                {user.username}
                              </div>
                            </Link>
                          </td>
                          <td className="px-2 sm:px-4 py-2 text-center text-gray-700">
                            <Link to={`/users/${user.id}`}>
                              <div className=" flex justiw-full">
                                {user.name}
                              </div>
                            </Link>
                          </td>
                          <td className="px-2 sm:px-4 py-2 text-center text-gray-700">
                            <Link to={`/users/${user.id}`}>
                              <div className=" flex justiw-full">
                                {user.blogs.length}
                              </div>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
