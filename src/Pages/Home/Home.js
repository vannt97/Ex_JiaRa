import React from "react";
import { useSelector } from "react-redux";

export default function Home(props) {
  let userLogin = useSelector((state) => state.UserReducer.userLogin);
  return (
    <div>
      Home
      {userLogin.name}
    </div>
  );
}
