import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
  fill?: string;
};

export const LocationPin = (props: Props) => {
  const {color = 'black'} = props;
  return (
    <Svg width={24} height={25} viewBox="0 0 24 25" fill="none">
      <G clipPath="url(#clip0_77_11420)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 20.5214C12 20.5214 6 16.5214 6 10.9504C6 9.52136 6 4.52136 12 4.52136C18 4.52136 18 9.37836 18 10.9504C18 16.5214 12 20.5214 12 20.5214Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 10.5214C14 11.6254 13.104 12.5214 12 12.5214C10.896 12.5214 10 11.6254 10 10.5214C10 9.41736 10.896 8.52136 12 8.52136C13.104 8.52136 14 9.41736 14 10.5214Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_77_11420">
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
