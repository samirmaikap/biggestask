import React, {useState} from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import StackHeader from '../../components/StackHeader';
import {AppImage} from '../../components/AppImage';
import {PencilIcon} from '../../components/icons/PencilIcon';
import {AppText} from '../../components/AppText';
import {AppSpacing} from '../../components/AppSpacing';
import {Colors} from '../../theme/colors';
import {Divider} from 'react-native-paper';
import {QuestionCard} from '../questions/QuestionCard';
import {getImagePayload, getInActiveQuestions, toRgba} from '../../utils/utils';
import {CameraIcon} from '../../components/icons/CameraIcon';
import {ProfileForm} from './ProfileForm';
import {useHeaderHeight} from '@react-navigation/elements';
import {useAppContext} from '../../contexts/AppContext';
import AppButton from '../../components/AppButton';
import AppStyles from '../../theme/AppStyles';
import {AppBottomSheet} from '../../components/AppBottomSheet';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {useToast} from 'react-native-toast-notifications';
import useInvitationQuery from '../../hooks/useInvitationQuery';
import {useRoute} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {format} from 'date-fns';
import useAttachmentsQuery from '../../hooks/useAttachmentsQuery';
import useAuthQuery from '../../hooks/useAuthQuery';
import useJourneyQuery from '../../hooks/useJourneyQuery';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        padding: 16,
    },
    indicatorContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 5,
        borderLeftColor: 'transparent',
        borderRightWidth: 5,
        borderRightColor: 'transparent',
        borderBottomWidth: 5,
        borderBottomColor: Colors.grey_2,
    },
    imageOverlay: {
        width: 100,
        height: 100,
        top: 0,
        left: 0,
        position: 'absolute',
        backgroundColor: toRgba(Colors.primary, 0.4),
        zIndex: 999,
        borderRadius: 12,
    },
    imageButton: {
        width: 100,
        height: 100,
        top: 0,
        left: 0,
        position: 'absolute',
        zIndex: 999,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sheetInput: {
        backgroundColor: Colors.grey_bg,
        paddingVertical: Platform.OS === 'ios' ? 16 : 12,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
});

export const ProfileScreen = () => {
    const route = useRoute();
    // @ts-ignore
    const {isSpectator} = route.params;
    const {state} = useAppContext();
    const isUserParent = state.journey.is_user_parent;
    const isParent1Self = state.journey.is_parent1_self;
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<number>(
        isUserParent ? (isParent1Self ? 0 : 1) : 0,
    );
    const headerHeight = useHeaderHeight();
    const [openSheet, setOpenSheet] = useState(false);
    const [email, setEmail] = useState('');
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const {sendInvitation} = useInvitationQuery();
    const {uploadImage} = useAttachmentsQuery();
    const {updateMe, getMe} = useAuthQuery();
    const {getJourney} = useJourneyQuery();
    const [requestSheetClose, setRequestSheetClose] = useState(false);

    const profiles = [];
    if (isSpectator) {
        if (isUserParent) {
            profiles.push(state.surrogate);
        } else {
            profiles.push(state.parent1);
            profiles.push(state.parent2);
        }
    } else {
        if (isUserParent) {
            if (isParent1Self) {
                profiles.push(state.parent1);
                profiles.push(state.parent2);
            } else {
                profiles.push(state.parent2);
                profiles.push(state.parent1);
            }
        } else {
            profiles.push(state.surrogate);
        }
    }

    const spectatorRole =
        state.user?.user_type === 'surrogate' ? 'parent' : 'surrogate';

    console.log(isSpectator ? spectatorRole : state.user?.user_type);

    let questions = getInActiveQuestions(
        state.parentQuestions,
        state.surrogateQuestions,
        isSpectator ? spectatorRole : state.user?.user_type,
        2,
    );

    const isEditable = state.user?.id === profiles[selectedProfile].id;

    const handleInvitePress = async () => {
        if (!email) {
            toast.show('Email address is required', {placement: 'top'});
            return;
        }

        setLoading(true);

        const response = await sendInvitation({
            email: email,
            type: 'parent',
        });

        setLoading(false);

        if (response?.error) {
            toast.show(response?.message, {placement: 'top'});
            return;
        }

        Keyboard.dismiss();
        setTimeout(() => {
            setOpenSheet(false);
        }, 300);
        toast.show('Invitation sent', {placement: 'top'});
    };

    const onImagePress = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.5,
        });

        const image = result?.assets ? result?.assets[0] : {};
        if (image?.uri) {
            const formData = new FormData();

            formData.append('attachment', getImagePayload(image?.uri));

            const imageUploadResponse = await uploadImage(formData);
            if (imageUploadResponse?.error) {
                toast.show('Unable to upload the image');
                return;
            }

            const payload = {
                image: imageUploadResponse,
            };

            const response = await updateMe(payload);
            if (response?.error) {
                toast.show(response?.message);
                return;
            }

            toast.show('Profile Updated');

            await getMe();
            await getJourney();
        }
    };

    const handleOnSave = async () => {
        setRequestSheetClose(true);
        await getMe();
        await getJourney();
    };

    console.log(profiles[0].avatar);

    const renderBottomSheet = () => {
        return (
            <AppBottomSheet
                isOpen={openSheet}
                requestClose={requestSheetClose}
                onClose={() => {
                    setOpenSheet(false);
                    setRequestSheetClose(false);
                }}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <AppText variant={'h2'}>Invite Partner</AppText>
                </View>
                <AppSpacing gap={16} />
                <AppText variant={'title'}>Partner's Email Address</AppText>
                <AppSpacing />
                <BottomSheetTextInput
                    autoCapitalize={'none'}
                    autoComplete={'email'}
                    autoCorrect={false}
                    keyboardType={'email-address'}
                    textContentType={'emailAddress'}
                    cursorColor={Colors.primary}
                    style={[styles.sheetInput]}
                    onChangeText={e => setEmail(e)}
                />
                <AppSpacing gap={16} />
                <AppButton
                    loading={loading}
                    disabled={loading}
                    onPress={async () => {
                        await handleInvitePress();
                    }}
                    contentStyle={AppStyles.buttonContent}
                    mode={'contained'}
                    style={AppStyles.button}>
                    Send Invitation
                </AppButton>
                <AppSpacing gap={16} />
            </AppBottomSheet>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <StackHeader
                title={
                    isSpectator
                        ? state.user?.user_type === 'surrogate'
                            ? 'Intended Parents'
                            : 'Gestational Carrier'
                        : 'Your Account'
                }
                actions={
                    isEditable
                        ? [
                              <TouchableOpacity
                                  key={'t-1'}
                                  activeOpacity={0.8}
                                  onPress={() => setIsEditing(!isEditing)}>
                                  <PencilIcon />
                              </TouchableOpacity>,
                          ]
                        : []
                }
            />
            <KeyboardAvoidingView
                keyboardVerticalOffset={Platform.select({
                    ios: 0,
                    android: headerHeight + 80,
                })}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    contentContainerStyle={{flexGrow: 1}}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.innerContainer}>
                        <View style={styles.centeredContainer}>
                            <View style={styles.row}>
                                <View style={{marginRight: 8}}>
                                    <TouchableOpacity
                                        onPress={() => setSelectedProfile(0)}>
                                        <AppImage
                                            size={100}
                                            uri={profiles[0].avatar}
                                            isLocal={false}
                                        />
                                        {selectedProfile !== 0 && (
                                            <View style={styles.imageOverlay} />
                                        )}
                                        {isEditing && selectedProfile === 0 && (
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                style={styles.imageButton}
                                                onPress={onImagePress}>
                                                <CameraIcon color={'white'} />
                                            </TouchableOpacity>
                                        )}
                                        <View style={styles.indicatorContainer}>
                                            {selectedProfile === 0 && (
                                                <View style={styles.triangle} />
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {profiles.length > 1 && profiles[1] && (
                                    <View style={{marginLeft: 8}}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                setSelectedProfile(1)
                                            }>
                                            <AppImage
                                                size={100}
                                                uri={profiles[1].avatar}
                                                isLocal={false}
                                            />
                                            {selectedProfile !== 1 && (
                                                <View
                                                    style={styles.imageOverlay}
                                                />
                                            )}
                                            {isEditing &&
                                                selectedProfile === 1 && (
                                                    <TouchableOpacity
                                                        activeOpacity={0.8}
                                                        style={
                                                            styles.imageButton
                                                        }>
                                                        <CameraIcon
                                                            color={'white'}
                                                        />
                                                    </TouchableOpacity>
                                                )}
                                            <View
                                                style={
                                                    styles.indicatorContainer
                                                }>
                                                {selectedProfile === 1 && (
                                                    <View
                                                        style={styles.triangle}
                                                    />
                                                )}
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </View>

                        <AppSpacing gap={16} />

                        {isEditing && <ProfileForm onSaved={handleOnSave} />}

                        {!isEditing && (
                            <View style={styles.centeredContainer}>
                                <AppText variant={'h2'}>
                                    {profiles[selectedProfile].name}
                                </AppText>
                                <AppSpacing />
                                <View style={styles.row}>
                                    <AppText color={Colors.grey_3}>
                                        {profiles[selectedProfile].dob
                                            ? profiles[selectedProfile].dob
                                            : 'NA'}
                                    </AppText>
                                    <AppSpacing isHorizontal={true} />
                                    <AppText>
                                        (
                                        {profiles[selectedProfile].age
                                            ? profiles[selectedProfile].age
                                            : 'NA'}
                                        )
                                    </AppText>
                                </View>
                                <AppSpacing gap={16} />
                                <Divider
                                    style={{
                                        backgroundColor: Colors.grey_bg,
                                        height: 2,
                                        width: 50,
                                    }}
                                />
                                <AppSpacing gap={16} />
                                <AppText>
                                    {profiles[selectedProfile]?.address
                                        ? profiles[selectedProfile]?.address
                                        : 'Address not available'}
                                </AppText>
                                <AppSpacing gap={16} />
                                <AppText color={Colors.primary}>
                                    {profiles[selectedProfile]?.phone
                                        ? profiles[selectedProfile]?.phone
                                        : 'Phone not available'}
                                </AppText>
                                <AppSpacing gap={16} />
                                <AppText>
                                    {profiles[selectedProfile]?.email}
                                </AppText>
                            </View>
                        )}

                        <AppSpacing gap={16} />

                        {!isSpectator && isUserParent && !state.parent2 && (
                            <View>
                                <AppText>
                                    Please ask your partner to join the app
                                </AppText>
                                <AppSpacing gap={16} />
                                <AppButton
                                    onPress={() => setOpenSheet(true)}
                                    contentStyle={AppStyles.buttonContent}
                                    style={AppStyles.button}
                                    mode={'contained'}>
                                    Invite Partner
                                </AppButton>
                                <AppSpacing gap={16} />
                            </View>
                        )}
                        {isEditing && (
                            <View>
                                <AppText fontWeight={'700'}>
                                    Existing questions in the profile
                                </AppText>
                                <AppSpacing gap={8} />
                            </View>
                        )}

                        <View>
                            {questions.length > 0 &&
                                questions.map((item: any, index: number) => (
                                    <View
                                        style={{marginVertical: 8}}
                                        key={`su-q-${index}`}>
                                        <QuestionCard
                                            time={item?.time}
                                            title={item?.question.text}
                                            user={item?.user_name}
                                            answer={item?.answer}
                                        />
                                    </View>
                                ))}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {renderBottomSheet()}
        </View>
    );
};
