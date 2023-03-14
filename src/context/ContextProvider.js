import React, { useState } from "react";
import ContextData from "./user-context";

const ContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [isLogin, setIsLogin] = useState();

  return (
    <ContextData.Provider
      value={{
        currentUser,
        isLogin,
        setCurrentUser: (user) => setCurrentUser(user),
        setIsLogin: (flag) => setIsLogin(flag),
      }}
    >
      {props.children}
    </ContextData.Provider>
  );
};

export default ContextProvider;
