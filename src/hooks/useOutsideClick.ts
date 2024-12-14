import { useEffect, useRef } from "react";
type Callback = () => void;
const useOutsideClick = (callback: Callback) => {
  const ref = useRef<HTMLElement | undefined>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [callback]);

  return ref;
};

export default useOutsideClick;
