import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const UserIcon = (props: Props) => {
    const {color = 'black'} = props;
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"

      >
      <G clipPath="url(#clip0_77_11829)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 11.5214C10 11.5214 9 10.5214 9 8.52136C9 6.52136 10 5.52136 12 5.52136C14 5.52136 15 6.52136 15 8.52136C15 10.5214 14 11.5214 12 11.5214Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M5 19.5214C5 16.7214 6 14.5214 12 14.5214C18 14.5214 19 16.7214 19 19.5214"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_77_11829">
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
