import React, { useEffect, useState } from "react";
import ModalTamplate from "./Modal.template";
import { isFunction } from "utils/function.util";

const Modal = (props) => {
  console.log(props);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(props.show);
  });
  const handleClickClose = () => {
    isFunction(props.onClickClose) && props.onClickClose();
  };
  return (
    <ModalTamplate
      {...props}
      onClickClose={handleClickClose}
      showModal={show}
    />
  );
};

export { Modal };
