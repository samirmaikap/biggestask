import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const SettingsIcon = (props: Props) => {
    return (
        <Svg width={24} height={25} viewBox="0 0 24 25" fill="none">
            <G clipPath="url(#clip0_77_11645)">
                <Path
                    d="M18 4.52136V20.5214"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M16 12.5214H20"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M12 4.52136V20.5214"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M10 16.5214H14"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M6 4.52136V20.5214"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M4 8.52136H8"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_77_11645">
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
