import React, { useEffect, useState } from "react";
import ModalAddressTemplate from "./ModalAddress.template";
import { getAddresses, changeActiveAddress } from "api";
import { isFunction } from "utils/function.util";

const ModalAddress = (props) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    console.log('hello');
    getAllAddresses();
  }, [props.state]);
  const handleClickClose = () => {
    isFunction(props.onClickClose) && props.onClickClose();
  };
  const getAllAddresses = async () => {
    const myAddresses = await getAddresses();
    setAddresses(myAddresses.data);
  };

  useEffect(() => {
    setShow(props.show);
  });

  const handleChangeRadio = async (event) => {
    try {
      setLoading(true);
      await changeActiveAddress(event.target.value);
      getAllAddresses();
    } catch (error) {
      console.log("erro r", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickAddAddress = () => {
    isFunction(props.onClickAddAddress()) && props.onClickAddAddress();
  };
  return (
    <ModalAddressTemplate
      {...props}
      onClickClose={handleClickClose}
      show={show}
      loading={loading}
      addresses={addresses}
      onChangeRadio={handleChangeRadio}
      onClickAddAddress={handleClickAddAddress}
    />
  );
};

export { ModalAddress };
