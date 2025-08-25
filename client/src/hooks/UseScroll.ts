import { useLayoutEffect, useRef, useState } from "react";

export const UseScroll = (
  threshold: number,
  target: React.RefObject<HTMLElement | null> | null = null
): { offset: number; isMatched: boolean } => {
  const [isMatched, setIsMatched] = useState<boolean>(false);
  const offsetRef = useRef<number>(0);
  const newPosRef = useRef<number>(0);
  const startPosRef = useRef<number>(0);

  useLayoutEffect(() => {
    const element = target?.current;
    console.log("firstTime Load");
    if (!element) return;
    startPosRef.current = element.getBoundingClientRect().top + window.scrollY;
  }, []);

  useLayoutEffect(() => {
    let ticking = false;
    let tr = 0;
    const element = target?.current;
    if (!element) return;
    newPosRef.current = element.getBoundingClientRect().top;

    const handleScroll = () => {
      if (!ticking) {
        tr = requestAnimationFrame(() => {
          newPosRef.current = element.getBoundingClientRect().top;
          const diff = startPosRef.current - newPosRef.current;
          offsetRef.current = diff;
          const status = diff < 0 || diff >= threshold;
          console.log("diff:", diff, "theshhold:", threshold);
          console.log("STATUS:", status);
          setIsMatched(status);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // run once on mount in case page is already scrolled
    handleScroll();

    return () => {
      console.log("unmouting...", tr);
      window.removeEventListener("scroll", handleScroll);
      if (tr) cancelAnimationFrame(tr);
    };
  }, [threshold, target?.current]);

  return { offset: offsetRef.current, isMatched };
};
