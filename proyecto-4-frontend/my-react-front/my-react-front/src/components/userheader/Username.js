import React from "react";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";

export default function Username(props) {
  const admin = props.authAdminState.authAdminState;
  const key = "🔑";
  console.log(admin);
  if (props.nickname.length) {
    return (
      <>
        <div>
          Username:{" "}
          <span className="strong">
            {props.nickname}
            {["top"].map((placement) => (
              <OverlayTrigger
                key={placement}
                placement={placement}
                overlay={
                  <Tooltip id={`tooltip-${placement}`}>
                    You have <strong>admin</strong> privileges
                  </Tooltip>
                }
              >
                {admin && <span>{key}</span>}
              </OverlayTrigger>
            ))}
          </span>
        </div>
      </>
    );
  }
  return (
    <div>
      Username: <span className="strong">Anonym </span>
    </div>
  );
}
