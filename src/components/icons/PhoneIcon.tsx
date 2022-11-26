import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const PhoneIcon = (props: Props) => {
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      >
      <G clipPath="url(#clip0_77_11542)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 4.52136C14 4.52136 13 5.86436 13 7.52136C13 8.97436 14 9.52136 14 10.5214C14 11.5214 11 14.5214 10 14.5214C9 14.5214 8.454 13.5214 7 13.5214C5.343 13.5214 4 14.5214 4 16.5214C4 18.5214 6 20.5214 8 20.5214C10 20.5214 12 20.5214 16 16.5214C20 12.5214 20 10.5214 20 8.52136C20 6.52136 18 4.52136 16 4.52136Z"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_77_11542">
          <Rect
            width={24}
            height={24}
            fill="white"
            transform="translate(0 0.521362)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
