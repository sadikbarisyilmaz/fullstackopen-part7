import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../services/users";
import { initializeUsers } from "../reducers/usersReducer";
import { useEffect } from "react";

export const Users = () => {
  //   const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  const users = useSelector((state) => state.users);
  console.log(users);
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users &&
          [...users].map((user, i) => {
            return (
              <li key={i}>
                <div>
                  {user.name}
                  <span> {user.blogs.length}</span>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
