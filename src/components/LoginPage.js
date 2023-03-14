import React, { useState, useContext } from "react";
import classes from "../styles/LoginPage.module.css";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlinePhone,
  AiOutlineMail,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import InputComponent from "./InputComponent";
import toast from "react-hot-toast";
import { validateLoginForm, validateSignupForm } from "../utils/validate-form";
import ToasterComponent from "./ToasterComponent";
import ContextData from "../context/user-context";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const { setCurrentUser, setIsLogin: setCurrentIsLogin } =
    useContext(ContextData);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  function emailChangeHandler(e) {
    setEmail(e.target.value);
  }
  function passwordChangeHandler(e) {
    setPassword(e.target.value);
  }
  function phoneChangeHandler(e) {
    setPhone(e.target.value);
  }

  function loginHandler(e) {
    e.preventDefault();
    if (!validateLoginForm(email, password, toast)) {
      return;
    }

    async function getUser() {
      const userData = await fetch("http://localhost:8080/authenticate-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const userJson = await userData.json();
      console.log(userJson);
      if (userJson.length === 0) {
        toast.error("email password did'nt exists");
      } else {
        toast.success("Login successfully");
        setCurrentIsLogin(true);
        setCurrentUser(userJson);
        setTimeout(() => {
          navigate("/userslist");
        }, 3000);
      }
    }
    getUser();

    setEmail("");
    setPassword("");
  }

  function onSignupHandler(e) {
    e.preventDefault();
    if (isLogin) {
      setIsLogin(false);
      navigate("/signup");
      return;
    }
    if (!validateSignupForm(email, password, phone, name, toast)) {
      return;
    }
    // console.log(email, password, phone, name);
    toast.success("User Created Successfully");
    async function sendUserData() {
      const userData = await fetch("http://localhost:8080/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, phone }),
      });
      const userDataJson = await userData.json();
      console.log(userDataJson);
    }
    sendUserData();
    setTimeout(() => {
      setIsLogin(true);
      navigate("/");
    }, 4000);
    setEmail("");
    setPassword("");
    setPhone("");
    setName("");
  }

  function directLogin(e) {
    e.preventDefault();
    if (!isLogin) {
      setIsLogin(true);
    }
    navigate("/");
  }

  return (
    <>
      <main className={classes["login-form"]}>
        <section className={classes["login-section"]}>
          <header>{isLogin ? "Login" : "Sign Up"}</header>

          <form action="/login/user" method="POST">
            {!isLogin && (
              <InputComponent
                id="name-id"
                icon={<AiOutlineUser />}
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <InputComponent
              id="email-id"
              icon={<AiOutlineMail />}
              label="E-mail"
              type="email"
              value={email}
              onChange={emailChangeHandler}
            />

            <InputComponent
              id="password"
              icon={<AiOutlineLock />}
              label="Password"
              type="password"
              value={password}
              onChange={passwordChangeHandler}
            />

            {!isLogin && (
              <InputComponent
                id="phone-number"
                icon={<AiOutlinePhone />}
                label="Contact No"
                type="phone"
                value={phone}
                onChange={phoneChangeHandler}
              />
            )}

            <div className={classes["action-btn__container"]}>
              {isLogin && <button onClick={loginHandler}>Login</button>}

              <button onClick={onSignupHandler}>Sign up</button>
              {!isLogin && <button onClick={directLogin}>Login</button>}
            </div>
          </form>
        </section>
      </main>

      <ToasterComponent />
    </>
  );
};

export default LoginPage;
