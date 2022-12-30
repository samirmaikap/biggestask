import React, {useContext, useState} from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {AppText} from '../../components/AppText';
import {Colors} from '../../theme/colors';
import {Button, Checkbox, RadioButton, TextInput} from 'react-native-paper';
import {AppStatusBar} from '../../components/AppStatusBar';
import {AppSpacing} from '../../components/AppSpacing';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppStyles from '../../theme/AppStyles';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Screens from '../../navigations/Screens';
import {useToast} from 'react-native-toast-notifications';
import {AppContext} from '../../contexts/AppContext';
import useAuthQuery from '../../hooks/useAuthQuery';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    inputGroup: {
        marginVertical: 8,
    },
});

export const CreateAccountScreen = () => {
    const insets = useSafeAreaInsets();
    const [acceptTerms, setAcceptTerms] = React.useState(false);
    const navigation = useNavigation<StackNavigationProp<any>>();
    const toast = useToast();
    const {state} = useContext(AppContext);

    const {register} = useAuthQuery();

    const [formData, setFormData] = useState({
        type: '',
        name: '',
        gender: 'male',
        password: '',
        password_confirmation: '',
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (v: string, field: string) => {
        setFormData({
            ...formData,
            [field]: v,
        });
    };

    const handleRegister = async () => {
        if (!state?.tempEmailVerified) {
            toast.show('Email not verified');
            return;
        }

        if (!formData?.type) {
            toast.show('Please choose a valid user type');
            return;
        }

        if (!formData?.gender) {
            toast.show('Please choose a valid user gender');
            return;
        }

        if (!state?.tempEmail) {
            toast.show("Email can't be empty");
            return;
        }

        if (!formData?.password) {
            toast.show("Password can't be empty");
            return;
        }

        if (!formData?.password_confirmation) {
            toast.show("Confirm password can't be empty");
            return;
        }

        if (formData?.password !== formData?.password_confirmation) {
            toast.show('Password & Confirm password does not match');
            return;
        }

        const payload = {
            ...formData,
            email: state.tempEmail,
        };

        setLoading(true);
        const response = await register(payload);
        setLoading(false);

        if (response?.error) {
            toast.show(response?.message);
            return;
        }

        toast.show('Account Created');
    };

    return (
        <View style={styles.container}>
            <AppStatusBar />
            <AppSpacing gap={insets.top} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1}}>
                    <View style={styles.innerContainer}>
                        <AppText variant={'h2'} textAlign={'center'}>
                            Setup Account
                        </AppText>
                        <AppSpacing gap={32} />
                        <View>
                            <View style={styles.inputGroup}>
                                <AppText variant={'title'}>
                                    Who are you in this surrogacy journey?
                                </AppText>
                                <AppSpacing gap={8} />
                                <View style={styles.row}>
                                    <RadioButton.Android
                                        value={formData?.type}
                                        status={
                                            formData?.type === 'parent'
                                                ? 'checked'
                                                : 'unchecked'
                                        }
                                        onPress={() =>
                                            handleInputChange('parent', 'type')
                                        }
                                    />
                                    <AppText>Intended Parent</AppText>
                                </View>
                                <View style={styles.row}>
                                    <RadioButton.Android
                                        value={formData?.type}
                                        status={
                                            formData?.type === 'surrogate'
                                                ? 'checked'
                                                : 'unchecked'
                                        }
                                        onPress={() =>
                                            handleInputChange(
                                                'surrogate',
                                                'type',
                                            )
                                        }
                                    />
                                    <AppText>Gestational Carrier</AppText>
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <AppText variant={'title'}>Full Name</AppText>
                                <TextInput
                                    mode={'outlined'}
                                    outlineStyle={{borderColor: Colors.grey_bg}}
                                    style={[
                                        styles.input,
                                        {
                                            backgroundColor: Colors.grey_bg,
                                            borderRadius: 12,
                                        },
                                    ]}
                                    theme={{roundness: 12}}
                                    value={formData?.name}
                                    onChangeText={v =>
                                        handleInputChange(v, 'name')
                                    }
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <AppText variant={'title'}>Email</AppText>
                                <TextInput
                                    disabled={true}
                                    mode={'outlined'}
                                    outlineStyle={{borderColor: Colors.grey_bg}}
                                    style={[
                                        styles.input,
                                        {
                                            backgroundColor: Colors.grey_bg,
                                            borderRadius: 12,
                                        },
                                    ]}
                                    theme={{roundness: 12}}
                                    value={state?.tempEmail}
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <AppText variant={'title'}>Gender</AppText>
                                <AppSpacing gap={8} />
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        <RadioButton.Android
                                            value={formData?.gender}
                                            status={
                                                formData?.gender === 'male'
                                                    ? 'checked'
                                                    : 'unchecked'
                                            }
                                            onPress={() =>
                                                handleInputChange(
                                                    'male',
                                                    'gender',
                                                )
                                            }
                                        />
                                        <AppText>Male</AppText>
                                    </View>
                                    <AppSpacing gap={16} isHorizontal={true} />
                                    <View style={styles.row}>
                                        <RadioButton.Android
                                            value={formData?.gender}
                                            status={
                                                formData?.gender === 'female'
                                                    ? 'checked'
                                                    : 'unchecked'
                                            }
                                            onPress={() =>
                                                handleInputChange(
                                                    'female',
                                                    'gender',
                                                )
                                            }
                                        />
                                        <AppText>Female</AppText>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <AppText variant={'title'}>Password</AppText>
                                <TextInput
                                    secureTextEntry={true}
                                    mode={'outlined'}
                                    outlineStyle={{borderColor: Colors.grey_bg}}
                                    style={[
                                        styles.input,
                                        {
                                            backgroundColor: Colors.grey_bg,
                                            borderRadius: 12,
                                        },
                                    ]}
                                    theme={{roundness: 12}}
                                    value={formData?.password}
                                    onChangeText={v =>
                                        handleInputChange(v, 'password')
                                    }
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <AppText variant={'title'}>
                                    Re-Enter Password
                                </AppText>
                                <TextInput
                                    secureTextEntry={true}
                                    mode={'outlined'}
                                    outlineStyle={{borderColor: Colors.grey_bg}}
                                    style={[
                                        styles.input,
                                        {
                                            backgroundColor: Colors.grey_bg,
                                            borderRadius: 12,
                                        },
                                    ]}
                                    theme={{roundness: 12}}
                                    value={formData?.password_confirmation}
                                    onChangeText={v =>
                                        handleInputChange(
                                            v,
                                            'password_confirmation',
                                        )
                                    }
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => setAcceptTerms(!acceptTerms)}
                                    style={styles.row}>
                                    <Checkbox.Android
                                        status={
                                            acceptTerms
                                                ? 'checked'
                                                : 'unchecked'
                                        }
                                        onPress={() => {
                                            setAcceptTerms(!acceptTerms);
                                        }}
                                    />
                                    <AppSpacing isHorizontal={true} />
                                    <View style={styles.row}>
                                        <AppText>I Accept </AppText>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate(
                                                    Screens.Terms,
                                                )
                                            }>
                                            <AppText
                                                textUnderline={true}
                                                variant={'custom'}
                                                color={Colors.primary}>
                                                Terms of Service
                                            </AppText>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputGroup}>
                                <Button
                                    loading={loading}
                                    disabled={loading || !acceptTerms}
                                    contentStyle={AppStyles.buttonContent}
                                    onPress={handleRegister}
                                    style={AppStyles.button}
                                    mode={'contained'}>
                                    Complete
                                </Button>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};
