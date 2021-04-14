import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

export default function Username(props) {
  const admin = props.authAdminState.authAdminState;
  const key = "🔑";
  const nickname = props.nickname;

    return (
      <>
        <div>
          Username:
          <span className="strong">
            {nickname}
            
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
