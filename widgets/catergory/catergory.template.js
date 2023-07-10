import React from "react";
import style from "./catergory.module.scss";

const CatergoryTemplate = () => {
  return (
    <div className="bg-white  p-5 mt-5 mx-5  ">
      <div className={style.test}>Static</div>
      <div className="moved">Moved</div>
      <div className={style.test}>Static</div>
    </div>
  );
};

export default CatergoryTemplate;
