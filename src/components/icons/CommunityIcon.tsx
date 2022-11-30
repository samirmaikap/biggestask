import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const CommunityIcon = (props: Props) => {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
        >
            <G clipPath="url(#clip0_3021_25809)">
                <Path
                    d="M10.36 17.94C5.759 17.62 5 15.74 5 11C5 5.75 5.929 4 12 4C18.07 4 19 5.75 19 11C19 15.74 18.24 17.62 13.639 17.94"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 11C10 11.553 9.553 12 9 12C8.447 12 8 11.553 8 11C8 10.447 8.447 10 9 10C9.553 10 10 10.447 10 11Z"
                    fill="black"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13 11C13 11.553 12.553 12 12 12C11.447 12 11 11.553 11 11C11 10.447 11.447 10 12 10C12.553 10 13 10.447 13 11Z"
                    fill="black"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 11C16 11.553 15.553 12 15 12C14.447 12 14 11.553 14 11C14 10.447 14.447 10 15 10C15.553 10 16 10.447 16 11Z"
                    fill="black"
                />
                <Path
                    d="M10.3477 17.9395H10.3587L11.9977 19.9995L13.6377 17.9395H13.6487"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_3021_25809">
                    <Rect width={24} height={24} fill="white"/>
                </ClipPath>
            </Defs>
        </Svg>
    );
};
