import { useEffect, useState } from "react";
import { userInfo } from "../signals/Signals";
export function useHover(ref: any) {
  const [isHovered, setIsHovered] = useState(false);

  function handleHover(e: any) {
    setIsHovered(true);
  }
  function handleOutside(e: any) {
    setIsHovered(false);
  }
  useEffect(() => {
    if (ref.current !== null && ref.current !== undefined) {
      ref.current.addEventListener("mouseover", handleHover);
      ref.current.addEventListener("mouseleave", handleOutside);
      return () => {
        ref.current.removeEventListener("mouseover", handleHover);
        ref.current.removeEventListener("mouseleave", handleOutside);
      };
    }
  });

  return userInfo.value ? isHovered : false;
}
