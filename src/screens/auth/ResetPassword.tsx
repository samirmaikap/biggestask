import React, {useState} from 'react';
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
import {TextInput} from 'react-native-paper';
import {AppSpacing} from '../../components/AppSpacing';
import AppStyles from '../../theme/AppStyles';
import {images} from '../../utils/constants';
import {Colors} from '../../theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Screens from '../../navigations/Screens';
import {StackNavigationProp} from '@react-navigation/stack';
import AppButton from '../../components/AppButton';
import {useToast} from 'react-native-toast-notifications';
import useAuthQuery from '../../hooks/useAuthQuery';
import {useAppContext} from '../../contexts/AppContext';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    innerContainer: {
        padding: 16,
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
});

export const ResetPasswordScreen = () => {
    const {height} = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const {changePassword} = useAuthQuery();
    const toast = useToast();
    const {state} = useAppContext();

    const onSubmit = async () => {
        if (!state?.tempEmail) {
            toast.show('Invalid email address');
            return;
        }

        if (!password) {
            toast.show("Password can't be empty");
            return;
        }

        if (!confirmPassword) {
            toast.show("Confirm Password can't be empty");
            return;
        }

        if (password !== confirmPassword) {
            toast.show('Password & Confirm Password does not match');
            return;
        }

        console.log('p', {
            password: password,
            confirmPassword: confirmPassword,
            email: state.tempEmail,
        });
        const response = await changePassword({
            password: password,
            password_confirmation: confirmPassword,
            email: state.tempEmail,
        });

        setLoading(false);
        if (response?.error) {
            toast.show(response?.message);
            return;
        }

        toast.show('Password has been updated');

        navigation.navigate(Screens.Login);
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.container}
                source={images.BACKGROUND}>
                <KeyboardAvoidingView behavior={'height'}>
                    <ScrollView
                        contentContainerStyle={{flexGrow: 1}}
                        showsVerticalScrollIndicator={false}>
                        <View style={[styles.innerContainer]}>
                            <View style={{height: insets.top, width: '100%'}} />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end',
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
                                <AppText variant={'h3'}>Reset Password</AppText>
                                <Logo size={150} />
                                <AppText
                                    textAlign={'center'}
                                    variant={'h1'}
                                    color={Colors.primary}>
                                    {'Welcome to\nThe Biggest Ask'}
                                </AppText>
                            </View>
                            <AppSpacing gap={32} />
                            <View>
                                <View>
                                    <AppText variant={'title'}>
                                        Password
                                    </AppText>
                                    <TextInput
                                        value={password}
                                        onChangeText={value =>
                                            setPassword(value)
                                        }
                                        onBlur={() =>
                                            setPasswordError(!password)
                                        }
                                        error={passwordError}
                                        mode={'outlined'}
                                        secureTextEntry={true}
                                        autoCorrect={false}
                                        outlineStyle={{borderColor: 'white'}}
                                        style={[
                                            styles.input,
                                            {
                                                backgroundColor: 'white',
                                                borderRadius: 12,
                                            },
                                        ]}
                                        theme={{roundness: 12}}
                                    />
                                </View>
                                <View>
                                    <AppSpacing gap={16} />
                                    <AppText variant={'title'}>
                                        Confirm Password
                                    </AppText>
                                    <TextInput
                                        value={confirmPassword}
                                        onChangeText={value =>
                                            setConfirmPassword(value)
                                        }
                                        onBlur={() =>
                                            setConfirmPasswordError(
                                                !confirmPassword,
                                            )
                                        }
                                        error={confirmPasswordError}
                                        mode={'outlined'}
                                        secureTextEntry={true}
                                        autoCorrect={false}
                                        outlineStyle={{borderColor: 'white'}}
                                        style={[
                                            styles.input,
                                            {
                                                backgroundColor: 'white',
                                                borderRadius: 12,
                                            },
                                        ]}
                                        theme={{roundness: 12}}
                                    />
                                </View>
                                <AppSpacing gap={16} />
                                <View>
                                    <AppButton
                                        loading={loading}
                                        disabled={loading}
                                        contentStyle={AppStyles.buttonContent}
                                        onPress={onSubmit}
                                        style={AppStyles.button}
                                        mode={'contained'}>
                                        Change Password
                                    </AppButton>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
};
