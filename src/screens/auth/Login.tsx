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
import {Button, TextInput} from 'react-native-paper';
import {AppSpacing} from '../../components/AppSpacing';
import AppStyles from '../../theme/AppStyles';
import {images} from '../../utils/constants';
import {Colors} from '../../theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Screens from '../../navigations/Screens';
import {StackNavigationProp} from '@react-navigation/stack';
import AppButton from '../../components/AppButton';
import useAuth from '../../hooks/useAuthQuery';

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

export const LoginScreen = () => {
    const {height} = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const {login, register} = useAuth();

    const onSubmit = () => {
        // if (email && password) {
        // }
        login();
        // navigation.navigate('Tabs')
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
                                        navigation.navigate(Screens.Signup)
                                    }
                                    activeOpacity={0.8}>
                                    <AppText fontWeight={'600'}>Signup</AppText>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    paddingTop: insets.top + 32,
                                    flexDirection: 'column',
                                    // justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <AppText variant={'h3'}>Login</AppText>
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
                                    <AppText variant={'title'}>Email</AppText>
                                    <TextInput
                                        autoComplete={'email'}
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        value={email}
                                        error={emailError}
                                        onBlur={() => setEmailError(!email)}
                                        onChangeText={value => setEmail(value)}
                                        mode={'outlined'}
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
                                    <AppSpacing gap={16} />
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
                                <AppSpacing gap={16} />
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                    }}>
                                    <TouchableOpacity>
                                        <AppText
                                            color={Colors.primary}
                                            variant="custom"
                                            textUnderline={true}>
                                            I forgot my password
                                        </AppText>
                                    </TouchableOpacity>
                                </View>
                                <AppSpacing gap={16} />
                                <View>
                                    <AppButton
                                        contentStyle={AppStyles.buttonContent}
                                        onPress={onSubmit}
                                        style={AppStyles.button}
                                        mode={'contained'}>
                                        Login
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
