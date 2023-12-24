import { RiArrowDownLine } from "react-icons/ri";

import { EllipseBlur, Styling } from "./styles";

const WhoWeAre: React.FC = () => {
  return (
    <Styling>
      <div
        onClick={() => {
          window.scrollTo({
            behavior: "smooth",
            top: document.getElementById("tutores")?.offsetTop,
          });
        }}
      >
        <RiArrowDownLine size={20} />
      </div>

      <p>Nós somos o PET Computação!</p>

      {typeof window !== "undefined" && window.innerWidth > 480 && <EllipseBlur />}
    </Styling>
  );
};

export default WhoWeAre;
