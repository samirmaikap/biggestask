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
import {StackNavigationProp} from '@react-navigation/stack';

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
                                    <AppText>Email</AppText>
                                    <TextInput
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
                                    <AppText>Password</AppText>
                                    <TextInput
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
                                    <Button
                                        contentStyle={AppStyles.buttonContent}
                                        onPress={() =>
                                            navigation.navigate('Tabs')
                                        }
                                        style={AppStyles.button}
                                        mode={'contained'}>
                                        Login
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
};
