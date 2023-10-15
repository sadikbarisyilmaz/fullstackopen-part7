import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PleaseLogin } from "./PleaseLogin";

export const Users = ({ users, loggedUser, showNotification }) => {
  const navigate = useNavigate();

  if (!loggedUser) {
    return <PleaseLogin />;
  }
  return (
    <div className="grid gap-4">
      <h1 className="p-4 text-3xl md:text-4xl">Users</h1>
      {loggedUser && (
        <div className="animate-fadeIn flex flex-col justify-center items-center w-full">
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
                            {user.username}
                          </td>
                          <td className="px-2 sm:px-4 py-2 text-gray-700">
                            {user.name}
                          </td>
                          <td className="px-2 sm:px-4 py-2 text-center text-gray-700">
                            {user.blogs.length}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
