import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
  fill?: string;
};

export const MilestonesIcon = (props: Props) => {
  const {color = 'black'} = props;
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      >
      <G clipPath="url(#clip0_77_10914)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 20.5214C5.066 20.5214 4 18.6464 4 13.0214C4 7.39636 5.066 5.52136 12 5.52136C18.934 5.52136 20 7.39636 20 13.0214C20 18.6464 18.934 20.5214 12 20.5214Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M5 10.5214H19"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9 3.52136V7.52136"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M15 3.52136V7.52136"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 14.5214C10 15.0744 9.553 15.5214 9 15.5214C8.447 15.5214 8 15.0744 8 14.5214C8 13.9684 8.447 13.5214 9 13.5214C9.553 13.5214 10 13.9684 10 14.5214Z"
          fill={color}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 14.5214C13 15.0744 12.553 15.5214 12 15.5214C11.447 15.5214 11 15.0744 11 14.5214C11 13.9684 11.447 13.5214 12 13.5214C12.553 13.5214 13 13.9684 13 14.5214Z"
          fill={color}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 14.5214C16 15.0744 15.553 15.5214 15 15.5214C14.447 15.5214 14 15.0744 14 14.5214C14 13.9684 14.447 13.5214 15 13.5214C15.553 13.5214 16 13.9684 16 14.5214Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_77_10914">
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
