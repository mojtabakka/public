import { useEffect, useRef } from "react";
const useOutsideClick = (callback: any) => {
  const ref = useRef<HTMLInputElement>();
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mouseover", handleClick);

    return () => {
      document.removeEventListener("mouseover", handleClick);
    };
  }, []);

  return ref;
};
export default useOutsideClick;
