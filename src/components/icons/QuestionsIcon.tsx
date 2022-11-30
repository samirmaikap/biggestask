import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const QuestionsIcon = (props: Props) => {
    const {color = 'black'} = props;
    return (
        <Svg width={24} height={25} viewBox="0 0 24 25" fill="none">
            <G clipPath="url(#clip0_77_10986)">
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 11.5214C10 12.0744 9.552 12.5214 9 12.5214C8.448 12.5214 8 12.0744 8 11.5214C8 10.9684 8.448 10.5214 9 10.5214C9.552 10.5214 10 10.9684 10 11.5214Z"
                    fill={color}
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13 11.5214C13 12.0744 12.552 12.5214 12 12.5214C11.448 12.5214 11 12.0744 11 11.5214C11 10.9684 11.448 10.5214 12 10.5214C12.552 10.5214 13 10.9684 13 11.5214Z"
                    fill={color}
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 11.5214C16 12.0744 15.552 12.5214 15 12.5214C14.448 12.5214 14 12.0744 14 11.5214C14 10.9684 14.448 10.5214 15 10.5214C15.552 10.5214 16 10.9684 16 11.5214Z"
                    fill={color}
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 18.5214H12C18.93 18.5214 20 16.7714 20 11.5214C20 6.27136 18.93 4.52136 12 4.52136C5.07 4.52136 4 6.27136 4 11.5214V20.5214L8 18.5214Z"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_77_10986">
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
