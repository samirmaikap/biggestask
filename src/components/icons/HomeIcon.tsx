import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
  fill?: string;
};

export const HomeIcon = (props: Props) => {
  const {size, color = 'black', fill} = props;
  return (
    <Svg width={24} height={25} viewBox="0 0 24 25" fill="none">
      <G clipPath="url(#clip0_77_11320)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 20.5214C5 20.5214 4 19.5214 4 15.5214C4 11.5214 9 8.52136 12 8.52136C15 8.52136 20 11.5214 20 15.5214C20 19.5214 19 20.5214 12 20.5214Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3 9.52136C6 5.52136 10.062 4.52136 12 4.52136C13.875 4.52136 18 5.52136 21 9.52136"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16 20.33V14.521H12V20.521"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 14.5214C9 15.0744 8.552 15.5214 8 15.5214C7.448 15.5214 7 15.0744 7 14.5214C7 13.9684 7.448 13.5214 8 13.5214C8.552 13.5214 9 13.9684 9 14.5214Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_77_11320">
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
