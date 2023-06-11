import React from "react";
import ProgressbarTemplate from "./Progressbar.template";

const Progressbar = (props) => {
  console.log("props", props);
  return <ProgressbarTemplate {...props} />;
};

export { Progressbar };
