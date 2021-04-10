import React from "react";
import Fish from "../images/fish.png";
import { Link } from "react-router-dom";

export default function error404() {
  return (
    <div className="error404">
      <h1>OH Fish!</h1>
      <img className="error404-image" src={Fish} alt="fish"></img>
      <div className="error404-text">
        <h4>This page is not found!</h4>
        <h2>I need to schedule a CALENDLY!</h2>

        <Link to="/">
          <h3>or just go to another page</h3>
        </Link>
      </div>
    </div>
  );
}
