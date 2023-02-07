import { useEffect, useMemo, useState } from "react";

export enum ViewPort {
  mobile = 768,
  tablet = 1024,
  laptop = 1440,
  desktop = 1680,
}

/**
 *
 * @param minWidth min width of the view port
 * @returns is desire width
 */
export const useViewport = (minWidth?: number) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [windowWidth]);

  const result = useMemo(
    () => ({
      isMobile: windowWidth <= ViewPort.mobile,
      isTablet: ViewPort.mobile < windowWidth && windowWidth <= ViewPort.tablet,
      isLaptop: ViewPort.tablet < windowWidth && windowWidth <= ViewPort.laptop,
      isDesktop: ViewPort.laptop < windowWidth,
      isDesiredWidth: minWidth ? windowWidth < minWidth : null,
    }),
    [windowWidth, minWidth]
  );

  return result;
};
