import React from "react";
import { useSelector } from "react-redux";

const Login = () => {

  const userInfo = useSelector((state) => state.user.userInfo)
  return (
    <div>
      <h1>Hello {userInfo.name? userInfo.name: 'User'} How Are You?, {}</h1>
    </div>
  );
};

export default Login;
