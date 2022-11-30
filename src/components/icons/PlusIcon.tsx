import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
    fill?: string;
};

export const PlusIcon = (props: Props) => {
    const {color = 'black'} = props;
    return (
        <Svg
            width={24}
            height={25}
            viewBox="0 0 24 25"
            fill="none"
        >
            <G clipPath="url(#clip0_77_11567)">
                <Path
                    d="M9 12.5214H15"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M12 9.52136V15.5214"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_77_11567">
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
