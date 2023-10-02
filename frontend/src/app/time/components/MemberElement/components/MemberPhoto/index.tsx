import { MemberColorTheme } from "../..";
import { Border, MemberImage } from "./styles";

interface MemberPhotoParams {
  colorTheme: MemberColorTheme;
  name: string;
  size?: number;
  src: string;
}

const MemberPhoto: React.FC<MemberPhotoParams> = ({ colorTheme, name, size, src }) => {
  if (!size) {
    size = 80;
  }

  return (
    <Border colorTheme={colorTheme}>
      <MemberImage
        src={src || "/no-profile-picture.svg"}
        title={name}
        width={size}
        height={size}
        alt={name}
      />
    </Border>
  );
};

export default MemberPhoto;
