import React from "react";
import errorImage from "../assets/error.jpg";

const Error = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height:'70vh',
        width:'100%',
      }}
    >
      <h1 style={{marinRight:'5vw'}}>404! NOT FOUND RESOURCES!</h1>
      <img style={{marginLeft:'5vw'}} src={errorImage} alt="error-img" />
    </div>
  );
};

export default Error;
