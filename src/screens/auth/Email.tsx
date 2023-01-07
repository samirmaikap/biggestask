import React, {useContext, useState} from 'react';
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
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
import {useNavigation, useRoute} from '@react-navigation/native';
import Screens from '../../navigations/Screens';
import {SheetLine} from '../../components/SheetLine';
import {StackNavigationProp} from '@react-navigation/stack';
import AppButton from '../../components/AppButton';
import useAuthQuery from '../../hooks/useAuthQuery';
import {useToast} from 'react-native-toast-notifications';
import {useAppContext} from '../../contexts/AppContext';
import messaging from '@react-native-firebase/messaging';

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

export const EmailScreen = () => {
    const route = useRoute();
    const {height} = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<StackNavigationProp<any>>();
    const {sendOtp, requestResetPassword} = useAuthQuery();
    const toast = useToast();
    const {state, dispatch} = useAppContext();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);

    // @ts-ignore
    const {isPasswordReset = false} = route?.params;

    const handleOtpSend = async () => {
        if (!email) {
            setEmailError("Email can't be empty");
            return;
        }

        setEmailError('');
        setLoading(true);

        const response = isPasswordReset
            ? await requestResetPassword({email: email})
            : await sendOtp({email: email});

        if (response?.error) {
            toast.show(response?.message);
            return;
        }

        setLoading(false);

        toast.show(response?.message);
        navigation.push(Screens.Verify, {isPasswordReset: isPasswordReset});
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.container}
                source={images.BACKGROUND}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'position' : undefined}>
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
                                <AppText variant={'h3'}>
                                    {isPasswordReset
                                        ? 'Request Password reset'
                                        : 'Signup'}
                                </AppText>
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
                                        Enter Your Email
                                    </AppText>
                                    <AppSpacing gap={8} />
                                    <AppText
                                        textAlign={'center'}
                                        color={Colors.grey_3}>
                                        Please enter your email address to get
                                        started!
                                    </AppText>
                                </View>
                                <AppSpacing gap={16} />
                                <View>
                                    <AppText variant={'title'}>Email</AppText>
                                    <TextInput
                                        autoCorrect={false}
                                        autoComplete="email"
                                        autoCapitalize={'none'}
                                        error={!emailError}
                                        onChangeText={v => setEmail(v)}
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
                                {emailError && (
                                    <AppText color={'red'}>
                                        {emailError}
                                    </AppText>
                                )}
                                <AppSpacing gap={16} />
                                <View>
                                    <AppButton
                                        loading={loading}
                                        disabled={loading}
                                        contentStyle={AppStyles.buttonContent}
                                        onPress={handleOtpSend}
                                        style={AppStyles.button}
                                        mode={'contained'}>
                                        Verify
                                    </AppButton>
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
