import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const UsersIcon = (props: Props) => {
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"

      >
      <G clipPath="url(#clip0_77_11833)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 11.5214C8 11.5214 7 10.5214 7 8.52136C7 6.52136 8 5.52136 10 5.52136C12 5.52136 13 6.52136 13 8.52136C13 10.5214 12 11.5214 10 11.5214Z"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3 19.5214C3 16.7214 4 14.5214 10 14.5214C16 14.5214 17 16.7214 17 19.5214"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M15 5.52136C16 5.52136 17 6.52136 17 8.52136C17 10.5214 16 11.5214 15 11.5214"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M19 15.5214C20.602 16.4224 21 17.8344 21 19.5214"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_77_11833">
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
