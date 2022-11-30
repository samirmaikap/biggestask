import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const DropdownIcon = (props: Props) => {
    return (
        <Svg
            width={24}
            height={25}
            viewBox="0 0 24 25"
            fill="none"
        >
            <G clipPath="url(#clip0_77_11031)">
                <Path
                    d="M10 11.5214L12 13.5214L14 11.5214"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_77_11031">
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
