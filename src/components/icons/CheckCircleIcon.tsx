import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};
export const CheckCircleIcon = (props: Props) => {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
        >
            <G clipPath="url(#clip0_3021_26836)">
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.125 21H10.875C6.526 21 3 17.475 3 13.125V10.875C3 6.525 6.526 3 10.875 3H13.125C17.474 3 21 6.525 21 10.875V13.125C21 17.475 17.474 21 13.125 21Z"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M8 12L11 15L16 9"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_3021_26836">
                    <Rect width={24} height={24} fill="white"/>
                </ClipPath>
            </Defs>
        </Svg>
    );
};
