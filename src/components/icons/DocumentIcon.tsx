import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const DocumentIcon = (props: Props) => {
    const {color = 'black'} = props;
    return (
        <Svg
            width={24}
            height={25}
            viewBox="0 0 24 25"
            fill="none"
        >
            <G clipPath="url(#clip0_77_11220)">
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 21.5214C5.934 21.5214 5 19.2714 5 12.5214C5 5.77136 5.934 3.52136 12 3.52136C18.066 3.52136 19 5.77136 19 12.5214C19 19.2714 18.066 21.5214 12 21.5214Z"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M14 3.62683V8.52183H18.797"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M9 12.5214H15"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M9 15.5214H12"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_77_11220">
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
