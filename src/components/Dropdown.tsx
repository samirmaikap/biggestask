import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import BottomSheet, {BottomSheetBackgroundProps, BottomSheetView} from '@gorhom/bottom-sheet';
import {Portal, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {interpolateColor, useAnimatedStyle} from 'react-native-reanimated';

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainerStyle: {
        paddingTop: 12,
        paddingBottom: 6,
        paddingHorizontal: 24,
        minHeight: 100,
    },
});

type Props = {
    button?: any;
    items: any;
};

const Dropdown = (props: Props) => {
    const theme = useTheme();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const {items, button} = props;
    const insets = useSafeAreaInsets();
    const [snapPoints, setSnapPoints] = useState([100]);
    const [isLoading, setIsLoading] = useState(false);
    const {bottom: safeBottomArea} = useSafeAreaInsets();
    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }, [isLoading]);

    const onButtonPress = () => {
        setIsLoading(true);
        bottomSheetRef.current?.expand();
    };

    const extraPadding = 32;

    const contentContainerStyle = useMemo(
        () => ({
            ...styles.contentContainerStyle,
            paddingBottom: safeBottomArea || 6,
        }),
        [safeBottomArea],
    );

    const onLayoutChange = (event: { nativeEvent: { layout: { height: any } } }) => {
        let {height} = event.nativeEvent.layout;
        if (!isLoading && height && bottomSheetRef?.current) {
            setSnapPoints([extraPadding + height]);
        }
    };
    const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
                                                                        style,
                                                                        animatedIndex,
                                                                    }) => {
        const containerAnimatedStyle = useAnimatedStyle(() => ({
            backgroundColor: interpolateColor(
                animatedIndex.value,
                [0, 1],
                [theme.colors.surface, theme.colors.surface],
            ),
        }));
        const containerStyle = useMemo(
            () => [style, containerAnimatedStyle],
            [style, containerAnimatedStyle],
        );

        return <Animated.View pointerEvents="none" style={containerStyle}/>;
    };

    return (
        <View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onButtonPress()}>
                {button}
            </TouchableOpacity>
            <Portal>
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    index={-1}
                    backgroundComponent={CustomBackground}
                    keyboardBehavior={'interactive'}
                    keyboardBlurBehavior={'restore'}
                    animateOnMount={true}>
                    <BottomSheetView style={contentContainerStyle}>
                        <View
                            style={{paddingBottom: insets.bottom}}
                            onLayout={onLayoutChange}>
                            {items.map((item: any, index: any) => (
                                <View key={`i-${index}`}>{item}</View>
                            ))}
                        </View>
                    </BottomSheetView>
                </BottomSheet>
            </Portal>
        </View>
    );
};

export default Dropdown;
