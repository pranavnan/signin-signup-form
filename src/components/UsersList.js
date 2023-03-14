import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ContextData from "../context/user-context";
import classes from "../styles/UsersList.module.css";
import ToasterComponent from "./ToasterComponent";
import toast from "react-hot-toast";

const UsersList = () => {
  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useContext(ContextData);

  useEffect(() => {
    async function getAllUsers() {
      const response = await fetch("http://localhost:8080/get-all-users");
      const responseData = await response.json();
      // console.log(responseData);
      setAllUsers(responseData);
    }
    getAllUsers();
  }, []);

  function logoutHandler(e) {
    e.preventDefault();
    toast.success("Logout Successfully");
    setTimeout(() => {
      setCurrentUser([]);
      navigate("/");
    }, 3000);
  }

  return (
    <>
      <main className={classes["users-lists"]}>
        <nav className={classes["navbar"]}>
          <span className={classes["greeting"]}>Hi, {currentUser[0].name}</span>
          <button onClick={logoutHandler}>Logout</button>
        </nav>
      </main>

      <section className={classes["data-table"]}>
        <center>
          <table border="true">
            <thead>
              <tr className={classes["table-head"]}>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Password</th>
              </tr>
            </thead>

            <tbody className={classes["table-body"]}>
              {allUsers.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.password}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </center>
      </section>

      <ToasterComponent />
    </>
  );
};

export default UsersList;
