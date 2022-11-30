import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const HelpIcon = (props: Props) => {
    return (
        <Svg
            width={24}
            height={25}
            viewBox="0 0 24 25"
            fill="none"
        >
            <G clipPath="url(#clip0_77_11310)">
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.125 21.5214H10.875C6.526 21.5214 3 17.9964 3 13.6464V11.3964C3 7.04636 6.526 3.52136 10.875 3.52136H13.125C17.474 3.52136 21 7.04636 21 11.3964V13.6464C21 17.9964 17.474 21.5214 13.125 21.5214Z"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13 16.5214C13 17.0744 12.552 17.5214 12 17.5214C11.448 17.5214 11 17.0744 11 16.5214C11 15.9684 11.448 15.5214 12 15.5214C12.552 15.5214 13 15.9684 13 16.5214Z"
                    fill="black"
                />
                <Path
                    d="M10 10.5214C10 9.41736 10.896 8.52136 12 8.52136C13.104 8.52136 14 9.41736 14 10.5214C14 11.6254 13.104 12.5214 12 12.5214V13.5214"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_77_11310">
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
