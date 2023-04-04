import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    ImageBackground,
    useWindowDimensions,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useHeaderHeight} from '@react-navigation/elements';
import {AppText} from '../../components/AppText';
import {AppSpacing} from '../../components/AppSpacing';
import {images} from '../../utils/constants';
import AppButton from '../../components/AppButton';
import AppStyles from '../../theme/AppStyles';
import {Logo} from '../../components/icons/Logo';

export const PasscodeScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState(false);
    const headerHeight = useHeaderHeight();
    const {height} = useWindowDimensions();

    const handleVerify = () => {
        setCodeError(false);
        setLoading(true);
        if (code === '321651') {
            navigation.navigate('Intro');
        } else {
            setCodeError(true);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.container}
                source={images.BACKGROUND}>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={Platform.select({
                        ios: 0,
                        android: headerHeight + 80,
                    })}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <ScrollView
                        contentContainerStyle={{flexGrow: 1}}
                        showsVerticalScrollIndicator={false}>
                        <View style={[styles.innerContainer]}>
                            <View style={{height: insets.top, width: '100%'}} />
                            <AppSpacing gap={height * 0.1} />
                            <View style={{alignItems: 'center'}}>
                                <Logo size={150} />
                                <AppSpacing gap={32} />
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                    }}>
                                    Welcome
                                </Text>
                                <Text
                                    style={{
                                        marginTop: 16,
                                        textAlign: 'center',
                                    }}>
                                    Please enter the 6 digit passcode you have
                                    received from The BiggestAsk Team
                                </Text>
                            </View>
                            <AppSpacing gap={32} />
                            <View>
                                <AppText variant={'title'}>Passcode</AppText>
                                <TextInput
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    keyboardType="numeric"
                                    value={code}
                                    error={codeError}
                                    onBlur={() => setCodeError(!code)}
                                    onChangeText={value => setCode(value)}
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
                            </View>
                            {codeError && <AppSpacing gap={16} />}
                            {codeError && (
                                <Text style={{color: 'red'}}>Invalid Code</Text>
                            )}
                            <AppSpacing gap={32} />
                            <View>
                                <AppButton
                                    loading={loading}
                                    disabled={loading}
                                    contentStyle={AppStyles.buttonContent}
                                    onPress={handleVerify}
                                    style={AppStyles.button}
                                    mode={'contained'}>
                                    Verify
                                </AppButton>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    innerContainer: {
        padding: 16,
        flex: 1,
        width: '100%',
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
});
