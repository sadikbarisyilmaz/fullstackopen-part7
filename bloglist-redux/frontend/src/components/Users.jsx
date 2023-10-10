import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/usersReducer";
import { useEffect } from "react";
import { Routes, Route, Link, useMatch } from "react-router-dom";

export const Users = ({ users }) => {
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(initializeUsers());
  //   }, []);

  //   const users = useSelector((state) => state.users);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users &&
          [...users].map((user, i) => {
            return (
              <li key={i}>
                <div>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                  <span> {user.blogs.length}</span>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
