import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
};

export const UnknownIcon = (props: Props) => {
    const {size = 88} = props;
    return (
        <Svg width={size} height={size} viewBox="0 0 88 88">
            <Rect
                x={0.5}
                y={0.5}
                width={87}
                height={87}
                rx={11.5}
                fill="#C6C4C2"
                stroke="#F8F5F2"
            />
            <G clipPath="url(#clip0_808_33879)">
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M45.125 53H42.875C38.526 53 35 49.475 35 45.125V42.875C35 38.525 38.526 35 42.875 35H45.125C49.474 35 53 38.525 53 42.875V45.125C53 49.475 49.474 53 45.125 53Z"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M45 48C45 48.553 44.552 49 44 49C43.448 49 43 48.553 43 48C43 47.447 43.448 47 44 47C44.552 47 45 47.447 45 48Z"
                    fill="white"
                />
                <Path
                    d="M42 42C42 40.896 42.896 40 44 40C45.104 40 46 40.896 46 42C46 43.104 45.104 44 44 44V45"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_808_33879">
                    <Rect
                        width={24}
                        height={24}
                        fill="white"
                        transform="translate(32 32)"
                    />
                </ClipPath>
            </Defs>
        </Svg>
    );
};
