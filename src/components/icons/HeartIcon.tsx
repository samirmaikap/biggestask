import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const HeartIcon = (props: Props) => {
    const {color = 'black', size = 24} = props;
    return (
        <Svg width={size} height={size} fill={'none'} viewBox="0 0 24 24">
            <G clipPath="url(#clip0_3156_8388)">
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 4C14 4 12 6 12 6C12 6 10 4 8 4C6 4 4 5 4 9C4 15 11.315 19.444 12 19C12.685 19.444 20 15 20 9C20 5 18 4 16 4Z"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_3156_8388">
                    <Rect width={24} height={24} fill="white" />
                </ClipPath>
            </Defs>
        </Svg>
    );
};
