import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";

export default function Handlelogin({ setToken }) {
  const [active, setActive] = useState(true);
  const [link, setLink] = useState(true)

  const activeState = active ? "login" : "signup"
  const buttonText = link ? "Or create an account" : "Log in";

  function handleClick(e) {
    e.preventDefault()
    setActive(!active)
    setLink(!link)
  }

  return (
    <>
      {activeState === "login" && <Login setToken={setToken} />}

      {activeState === "signup" && <Signup />}

      <a href="#" onClick={handleClick} className="login-link"><p>{buttonText}</p></a>
    </>
  );
}
