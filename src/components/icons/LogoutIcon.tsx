import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const LogoutIcon = (props: Props) => {
    return (
        <Svg
            width={24}
            height={25}
            viewBox="0 0 24 25"
            fill="none"
        >
            <G clipPath="url(#clip0_77_11434)">
                <Path
                    d="M19.1111 12.5212H11.1111"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M16.1111 15.5212L19.1111 12.5212L16.1111 9.52124"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M10.1111 4.52124C5.91112 4.52124 5.00012 5.52124 5.00012 12.5212C5.00012 19.5212 5.91112 20.5212 10.1111 20.5212"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_77_11434">
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
