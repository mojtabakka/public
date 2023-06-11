import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
  const handleClick = (e) => {
    // console.log(ref.current);
    // console.log(e.target);
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;
