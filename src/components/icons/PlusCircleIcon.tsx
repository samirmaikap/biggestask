import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const PlusCircleIcon = (props: Props) => {
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"

      >
      <G clipPath="url(#clip0_77_11562)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.125 21.5214H10.875C6.525 21.5214 3 17.9964 3 13.6464V11.3964C3 7.04636 6.525 3.52136 10.875 3.52136H13.125C17.475 3.52136 21 7.04636 21 11.3964V13.6464C21 17.9964 17.475 21.5214 13.125 21.5214Z"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9 12.5214H15"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12 9.52136V15.5214"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_77_11562">
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
