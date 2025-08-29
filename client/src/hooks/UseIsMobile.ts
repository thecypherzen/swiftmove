import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * A hook that checks if the viewport is of a particular dimension
 * @function UseIsMobile
 * @param { number } breakpoint - viewport width to check for
 *   - defaults to **768**
 * @returns boolean
 */
export function UseIsMobile(breakpoint: number = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {}, [isMobile]);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < breakpoint);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
