import React from "react";
import "./EnterPassword.css";
import ImageGrid from "../components/Password/ImageGrid";
const EnterPassword = () => {
  return (
    <div
      style={{
        color: "white",
        paddingLeft: "3vw",
        paddingRight: "3vw",
        margin: "20px",
        fontSize: "large",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Enter Password</p>
        <button className="button">Click here to submit </button>
      </div>

      <ImageGrid />
    </div>
  );
};

export default EnterPassword;
