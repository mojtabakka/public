import React from "react";
import style from "./catergory.module.scss";
// import { Card } from "../../components";

const CatergoryTemplate = () => {
  // if (document) {
  //   var reveals = document.querySelectorAll(".moved");

  //   for (var i = 0; i < reveals.length; i++) {
  //     var windowHeight = window.innerHeight;
  //     console.log(windowHeight);
  //     var elementTop = reveals[i].getBoundingClientRect().top;
  //     console.log(elementTop);
  //     var elementVisible = 150;

  //     // if (elementTop < windowHeight - elementVisible) {
  //     //   reveals[i].classList.add("active");
  //     // } else {
  //     //   reveals[i].classList.remove("active");
  //     // }
  //   }
  // }
  return (
    <div className="bg-white  p-5 mt-5 mx-5  ">
      {/* <span className="p-10 ">
          <span className=" w-96 h-96 p-10 rounded-full bg-blue-100">helo</span>
        </span>
        <span className="p-10 ">
          <span className=" w-96 h-96 p-10 rounded-full bg-blue-100">helo</span>
        </span> */}

      <div className={style.test}>Static</div>
      <div className="moved">Moved</div>
      <div className={style.test}>Static</div>
    </div>
  );
};

export default CatergoryTemplate;
