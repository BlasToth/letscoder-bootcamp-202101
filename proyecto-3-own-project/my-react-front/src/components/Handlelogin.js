import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";
import Logo from "../images/logo_verb_shark.png";

export default function Handlelogin({ setToken }) {
  const [active, setActive] = useState(true);
  const [link, setLink] = useState(true)

  const activeState = active ? "login" : "signup"
  const buttonText = link ? "Or create an account" : " Or log in";

  function handleClick(e) {
    e.preventDefault()
    setActive(!active)
    setLink(!link)
  }

  return (
    <>
      <img className="logo - shark verb" src={Logo} alt="shark verb"></img>

      {activeState === "login" && <Login setToken={setToken} />}

      {activeState === "signup" && <Signup />}

      <div onClick={handleClick} className="login-link"><p>{buttonText}</p></div>
    </>
  );
}
