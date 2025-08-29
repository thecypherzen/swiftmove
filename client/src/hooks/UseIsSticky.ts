import { useEffect, useState } from "react";

const UseIsSticky = <T extends HTMLElement>(ref: React.RefObject<T | null>) => {
  const [obj, setObj] = useState<T | null>(null);

  useEffect(() => {
    setObj(ref.current);
  });

  useEffect(() => {
    if (obj) {
      console.log(obj.getBoundingClientRect().top);
    }
  }, [obj]);
  return false;
};

export default UseIsSticky;
