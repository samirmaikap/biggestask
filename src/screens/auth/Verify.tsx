import React from 'react';
import {
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import {AppText} from '../../components/AppText';
import {Logo} from '../../components/icons/Logo';
import {Button, TextInput} from 'react-native-paper';
import {AppSpacing} from '../../components/AppSpacing';
import AppStyles from '../../theme/AppStyles';
import {images} from '../../utils/constants';
import {Colors} from '../../theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Screens from '../../navigations/Screens';
import {SheetLine} from '../../components/SheetLine';
import {StackNavigationProp} from '@react-navigation/stack';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    innerContainer: {
        // padding: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'white',
    },
    absoluteButton: {
        position: 'absolute',
        right: 16,
    },
    lowerContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
});

export const VerifyScreen = () => {
    const {height} = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<StackNavigationProp<any>>();

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.container}
                source={images.BACKGROUND}>
                <KeyboardAvoidingView behavior={'position'}>
                    <ScrollView
                        contentContainerStyle={{flexGrow: 1}}
                        showsVerticalScrollIndicator={false}>
                        <View
                            style={[
                                styles.innerContainer,
                                {minHeight: height},
                            ]}>
                            <View style={{height: insets.top, width: '100%'}} />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end',
                                    padding: 16,
                                }}>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate(Screens.Login)
                                    }
                                    activeOpacity={0.8}>
                                    <AppText fontWeight={'600'}>Login</AppText>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    paddingTop: insets.top + 32,
                                    flexDirection: 'column',
                                    // justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <AppText variant={'h3'}>Verify Code</AppText>
                                <Logo size={150} />
                                <AppText
                                    textAlign={'center'}
                                    variant={'h1'}
                                    color={Colors.primary}>
                                    {'Welcome to\nThe Biggest Ask'}
                                </AppText>
                            </View>
                            <AppSpacing gap={32} />
                            <View style={{flex: 1}} />
                            <View style={styles.lowerContainer}>
                                <SheetLine />
                                <AppSpacing gap={16} />
                                <View>
                                    <AppText
                                        textAlign={'center'}
                                        variant={'h3'}>
                                        Enter Your Code
                                    </AppText>
                                    <AppSpacing gap={8} />
                                    <AppText
                                        textAlign={'center'}
                                        color={Colors.grey_3}>
                                        Enter the code you've received via your
                                        email
                                    </AppText>
                                </View>
                                <AppSpacing gap={16} />
                                <View>
                                    <AppText>Code</AppText>
                                    <TextInput
                                        secureTextEntry={true}
                                        placeholder="* * * *"
                                        mode={'outlined'}
                                        outlineStyle={{
                                            borderColor: Colors.grey_bg,
                                        }}
                                        style={[
                                            styles.input,
                                            {
                                                backgroundColor: Colors.grey_bg,
                                                borderRadius: 12,
                                            },
                                        ]}
                                        theme={{roundness: 12}}
                                    />
                                </View>
                                <AppSpacing gap={16} />
                                <View>
                                    <Button
                                        contentStyle={AppStyles.buttonContent}
                                        onPress={() =>
                                            navigation.navigate(
                                                Screens.AccountSetup,
                                            )
                                        }
                                        style={AppStyles.button}
                                        mode={'contained'}>
                                        Continue
                                    </Button>
                                </View>
                                <AppSpacing gap={16 + insets.bottom} />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
};
