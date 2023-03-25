import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const CameraIcon = (props: Props) => {
    const {color = 'black'} = props;
    return (
        <Svg width={24} fill="none" height={25} viewBox="0 0 24 25">
            <G clipPath="url(#clip0_77_11545)">
                <Path
                    d="M12 4.52136H15"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 11.5214C9 12.0744 8.552 12.5214 8 12.5214C7.448 12.5214 7 12.0744 7 11.5214C7 10.9684 7.448 10.5214 8 10.5214C8.552 10.5214 9 10.9684 9 11.5214Z"
                    stroke={color}
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 20.5214C5.067 20.5214 4 18.8964 4 14.0214C4 9.14636 5.067 7.52136 12 7.52136C18.933 7.52136 20 9.14636 20 14.0214C20 18.8964 18.933 20.5214 12 20.5214Z"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 14.0214C16 15.4024 14.881 16.5214 13.5 16.5214C12.119 16.5214 11 15.4024 11 14.0214C11 12.6404 12.119 11.5214 13.5 11.5214C14.881 11.5214 16 12.6404 16 14.0214Z"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_77_11545">
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
