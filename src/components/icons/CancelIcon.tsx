import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const CancelIcon = (props: Props) => {
  return (
    <Svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      >
      <Path
        d="M3.54297 3.54102L8.5013 8.49934M8.5013 8.49934L13.4596 13.4577M8.5013 8.49934L13.4596 3.54102M8.5013 8.49934L3.54297 13.4577"
        stroke="black"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
