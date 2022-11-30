import React from 'react';
import {
    KeyboardAvoidingView,
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
    const [checked, setChecked] = React.useState('first');
    const insets = useSafeAreaInsets();
    const [gender, setGender] = React.useState('male');
    const [acceptTerms, setAcceptTerms] = React.useState(false);
    const navigation = useNavigation<StackNavigationProp<any>>();

    return (
        <View>
            <AppStatusBar />
            <AppSpacing gap={insets.top} />
            <KeyboardAvoidingView behavior={'padding'}>
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
                                <AppText>
                                    Who are you in this surrogacy journey?
                                </AppText>
                                <View style={styles.row}>
                                    <RadioButton.Android
                                        value="first"
                                        status={
                                            checked === 'first'
                                                ? 'checked'
                                                : 'unchecked'
                                        }
                                        onPress={() => setChecked('first')}
                                    />
                                    <AppText>Intended Parent</AppText>
                                </View>
                                <View style={styles.row}>
                                    <RadioButton.Android
                                        value="second"
                                        status={
                                            checked === 'second'
                                                ? 'checked'
                                                : 'unchecked'
                                        }
                                        onPress={() => setChecked('second')}
                                    />
                                    <AppText>Gestational Carrier</AppText>
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <AppText>Full Name</AppText>
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
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <AppText>Email</AppText>
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
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <AppText>Gender</AppText>
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        <RadioButton.Android
                                            value="male"
                                            status={
                                                gender === 'male'
                                                    ? 'checked'
                                                    : 'unchecked'
                                            }
                                            onPress={() => setGender('male')}
                                        />
                                        <AppText>Male</AppText>
                                    </View>
                                    <AppSpacing gap={16} isHorizontal={true} />
                                    <View style={styles.row}>
                                        <RadioButton.Android
                                            value="female"
                                            status={
                                                gender === 'female'
                                                    ? 'checked'
                                                    : 'unchecked'
                                            }
                                            onPress={() => setGender('female')}
                                        />
                                        <AppText>Female</AppText>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <AppText>Password</AppText>
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
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <AppText>Re-Enter Password</AppText>
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
                                        <TouchableOpacity>
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
                                    contentStyle={AppStyles.buttonContent}
                                    onPress={() => navigation.navigate('Tabs')}
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
