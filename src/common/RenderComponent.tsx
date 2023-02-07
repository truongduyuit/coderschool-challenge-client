import React from "react";
import { useViewport, ViewPort } from "../hooks";

type Props = Partial<{
  [key in keyof typeof ViewPort]: React.ReactElement;
}>;

export const RenderComponent = ({ desktop, laptop, mobile, tablet }: Props) => {
  const { isLaptop, isMobile, isTablet } = useViewport();

  const render = () => {
    if (isMobile) return mobile;
    else if (isTablet) return tablet;
    else if (isLaptop) return laptop;
    else return desktop;
  };

  return <React.Fragment>{render()}</React.Fragment>;
};
