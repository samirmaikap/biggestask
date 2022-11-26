import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const ContactProviderIcon = (props: Props) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      >
      <G clipPath="url(#clip0_3021_25817)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 7V20C12 18.9 11.1 18 10 18H4V5C4 4 9 4 9 4C11 4 12 5 12 7Z"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 7V20C12 18.9 12.9 18 14 18H20V5C20 4 15 4 15 4C13 4 12 5 12 7Z"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3021_25817">
          <Rect width={24} height={24} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
