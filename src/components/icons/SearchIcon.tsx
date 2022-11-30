import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const SearchIcon = (props: Props) => {
    const {color = 'black', size = 24} = props;
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <G clipPath="url(#clip0_456_17401)">
                <Rect width={24} height={24} fill="white"/>
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.875 18H11.125C8 18 5 15 5 11.875V10.125C5 7 8 4 11.125 4H12.875C16 4 19 7 19 10.125V11.875C19 15 16 18 12.875 18Z"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M20.0006 20L16.8906 16.5"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_456_17401">
                    <Rect width={24} height={24} fill="white"/>
                </ClipPath>
            </Defs>
        </Svg>
    );
};
