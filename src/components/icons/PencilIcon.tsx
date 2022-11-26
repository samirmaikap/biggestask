import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const PencilIcon = (props: Props) => {
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      >
      <G clipPath="url(#clip0_77_11167)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.49998 15.1082C7.27398 13.8822 8.61798 12.1622 11.958 8.8212C15.3 5.4802 16.274 4.8822 17.5 6.1082C18.726 7.3342 18.128 8.3082 14.787 11.6492C11.446 14.9912 9.72598 16.3342 8.49998 15.1082Z"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.70701 18.3152C6.31601 18.7062 5.68401 18.7062 5.29301 18.3152C4.90201 17.9242 4.90201 17.2922 5.29301 16.9012C5.68401 16.5102 6.31601 16.5102 6.70701 16.9012C7.09801 17.2922 7.09801 17.9242 6.70701 18.3152Z"
          fill="black"
        />
        <Path
          d="M9.64795 11.2556L12.3519 13.9606"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9 19.6082H18"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_77_11167">
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
