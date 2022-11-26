import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};
export const EmailIcon = (props: Props) => {
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      >
      <G clipPath="url(#clip0_77_11179)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 19.5214C5.25 19.5214 3 17.7714 3 12.5214C3 7.27136 5.25 5.52136 12 5.52136C18.75 5.52136 21 7.27136 21 12.5214C21 17.7714 18.75 19.5214 12 19.5214Z"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M4.76953 7.90125C7.54053 11.2812 11.9995 13.5212 11.9995 13.5212C11.9995 13.5212 16.4595 11.2812 19.2305 7.90125"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_77_11179">
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
