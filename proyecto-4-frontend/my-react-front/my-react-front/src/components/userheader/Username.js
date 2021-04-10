import React, { createRef }from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

export default function Username(props) {
  const admin = props.authAdminState.authAdminState;
  const key = "🔑";
  const myRef = createRef();

  if (props.nickname.length) {
    return (
      <>
        <div>
          Username:{" "}
          <span className="strong">
            {props.nickname}
            
            {admin ? (
              ["top"].map((placement) => (
              <OverlayTrigger 
                key={placement}
                placement={placement}
                overlay={
                  <Tooltip id={`tooltip-${placement}`}>
                    You have <strong>admin</strong> privileges
                  </Tooltip>
                }
              >
                {<span>{key}</span>}
              </OverlayTrigger>
            ))
        
      ) : (
        <></>
      )}
          </span>
        </div>
      </>
    );
  }
}
