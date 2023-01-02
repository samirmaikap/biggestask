import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Keyboard, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Portal, useTheme} from 'react-native-paper';
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetScrollView,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
    action?: any;
    children: React.ReactNode;
    isOpen?: boolean;
    onClose?: Function;
    requestClose?: boolean;
};

export const AppBottomSheet = (props: Props) => {
    const theme = useTheme();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const {requestClose, action, children, isOpen = false, onClose} = props;
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

    useEffect(() => {
        if (requestClose && bottomSheetRef?.current) {
            bottomSheetRef.current?.close();
        }
    }, [requestClose]);

    useEffect(() => {
        if (!action && isOpen) {
            onButtonPress();
        }
    }, [action, isOpen]);

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

    const onLayoutChange = (event: {nativeEvent: {layout: {height: any}}}) => {
        let {height} = event.nativeEvent.layout;
        if (!isLoading && height && bottomSheetRef?.current) {
            setSnapPoints([extraPadding + height]);
        }
    };

    const renderBackdrop = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                style={[props.style]}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.5}
                pressBehavior="close"
            />
        ),
        [],
    );

    const handleSheetClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <View>
            {action && (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onButtonPress()}>
                    {action}
                </TouchableOpacity>
            )}

            <Portal>
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    index={-1}
                    onClose={() => handleSheetClose()}
                    backdropComponent={renderBackdrop}
                    keyboardBehavior={'interactive'}
                    keyboardBlurBehavior={'restore'}
                    animateOnMount={true}>
                    <BottomSheetView style={contentContainerStyle}>
                        <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                            <View
                                style={{paddingBottom: insets.bottom}}
                                onLayout={onLayoutChange}>
                                {children}
                            </View>
                        </TouchableOpacity>
                    </BottomSheetView>
                </BottomSheet>
            </Portal>
        </View>
    );
};
