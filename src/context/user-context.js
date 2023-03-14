import React from "react";

const ContextData = React.createContext({
  currentUser: "",
  setCurrentUser: (user) => {},
  isLogin: "",
  setIsLogin: (flag) => {},
});

export default ContextData;
