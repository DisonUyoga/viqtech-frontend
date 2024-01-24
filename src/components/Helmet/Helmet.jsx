import React from "react";
import { Container } from "reactstrap";

const Helmet = (props) => {
  console.log("hello");
  document.title = "viqtech -" + props.title;
  return <>{props.children}</>;
};

export default Helmet;
