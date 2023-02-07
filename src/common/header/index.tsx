import { RenderComponent } from "../RenderComponent";
import { HeaderPc } from "./HeaderPc";

type Props = {};

export const Header = (props: Props) => {
  return (
    <RenderComponent
      desktop={<HeaderPc />}
      laptop={<HeaderPc />}
      tablet={<HeaderPc />}
    />
  );
};
