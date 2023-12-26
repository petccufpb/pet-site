import { Border, MemberImage } from "./styles";

export interface MemberColorTheme {
  color: string;
  gradient: string;
}

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
        src={src || "/images/no-profile-picture.svg"}
        title={name}
        width={size}
        height={size}
        alt={name}
      />
    </Border>
  );
};

export default MemberPhoto;
