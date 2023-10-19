import { Link } from "react-router-dom";
import { Loader } from "./Loader";

export const User = ({ user }) => {
  if (!user) {
    return (
      <div className="animate-fadeIn grow bg-[#fffdfa] px-6 md:px-32 pt-28 pb-4 flex flex-col justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="animate-fadeIn grow bg-[#fffdfa] px-6 md:px-32 pt-28 pb-4 flex flex-col justify-center items-center">
      <div className="flex bg-white flex-col justify-center items-center p-6 shadow-xl rounded-md">
        <h1 className="py-8 text-3xl md:text-5xl text-[#ff5a19]">
          {user.name}
        </h1>
        <h2 className="text-xl mb-4 md:text-2xl">Blogs Created</h2>
        {user.blogs.length > 0 ? (
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white  text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="px-2 sm:px-4 py-2 font-bold text-gray-900">
                  No.
                </th>
                <th className="px-2 sm:px-4 py-2 font-bold text-gray-900">
                  Blog Title
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 [&>*:nth-child(odd)]:bg-gray-100 [&>*:nth-child(even)]:bg-white">
              {user.blogs.map((blog, i) => {
                return (
                  <tr className=" text-xsmd:text-sm" key={i}>
                    <td className="px-2 sm:px-4 py-2 font-medium text-gray-900">
                      <Link to={`/blogs/${blog.id}`}>
                        <div className=" flex justify-center  w-full">
                          {i + 1}.
                        </div>
                      </Link>
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-center text-gray-700">
                      <Link to={`/blogs/${blog.id}`}>
                        <div className=" flex justify-center  w-full">
                          {blog.title}
                        </div>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          "No Blogs Found"
        )}
      </div>
    </div>
  );
};
