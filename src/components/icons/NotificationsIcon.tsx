import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const NotificationsIcon = (props: Props) => {
    const {size} = props;
    return (
        <Svg width={size} height={size} viewBox="0 0 24 25" fill="none">
            <G clipPath="url(#clip0_77_10871)">
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 10.5214V8.89636C17 6.48036 15.041 4.52136 12.625 4.52136H11.375C8.959 4.52136 7 6.48036 7 8.89636V10.5214C7 13.8964 5 14.5214 5 15.5214C5 16.5214 7.25 17.5214 12 17.5214C16.75 17.5214 19 16.5214 19 15.5214C19 14.5214 17 13.1464 17 10.5214Z"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M11 20.5214H13"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_77_10871">
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
