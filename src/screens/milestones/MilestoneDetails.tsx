import React, {useEffect, useRef, useState} from 'react';
import {
    Animated,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import StackHeader from '../../components/StackHeader';
import {images} from '../../utils/constants';
import {AppText} from '../../components/AppText';
import {AppSpacing} from '../../components/AppSpacing';
import {CalendarIcon} from '../../components/icons/CalendarIcon';
import {Colors} from '../../theme/colors';
import {Button, Checkbox, Switch} from 'react-native-paper';
import AppStyles from '../../theme/AppStyles';
import {FilePlus} from '../../components/icons/FilePlus';
import {AppTextInput} from '../../components/AppTextInput';
import {CheckCircleIcon} from '../../components/icons/CheckCircleIcon';
import {AppBottomSheet} from '../../components/AppBottomSheet';
import BottomSheet, {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import DatePicker from 'react-native-date-picker';
import {LocationPin} from '../../components/icons/LocationPin';
import {format} from 'date-fns';
import AppButton from '../../components/AppButton';
import App from '../../../App';
import {useRoute} from '@react-navigation/native';
import {useAppContext} from '../../contexts/AppContext';
import {useHeaderHeight} from '@react-navigation/elements';
import usePlaceSearchQuery from '../../hooks/usePlaceSearchQuery';
import {AppImage} from '../../components/AppImage';
import {getImagePayload} from '../../utils/utils';
import {launchImageLibrary} from 'react-native-image-picker';
import {useToast} from 'react-native-toast-notifications';
import useAttachmentsQuery from '../../hooks/useAttachmentsQuery';
import useCommunityQuery from '../../hooks/useCommunityQuery';
import useMilestoneQuery from '../../hooks/useMilestoneQuery';
import get = Reflect.get;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        flex: 1,
        padding: 16,
    },
    icon: {
        width: 75,
        height: 75,
        overflow: 'hidden',
        borderRadius: 12,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    uploadContainer: {
        padding: 16,
        borderRadius: 12,
        borderColor: Colors.grey_3,
        borderWidth: 1,
        borderStyle: 'dashed',
    },
    centeredContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 300,
        borderRadius: 12,
        overflow: 'hidden',
    },
    overlay: {
        position: 'absolute',
        bottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    searchContainer: {
        width: '100%',
        // backgroundColor: 'red',
        zIndex: 99,
        paddingVertical: 8,
    },
    searchedItem: {
        paddingVertical: 8,
    },
    input: {
        backgroundColor: Colors.grey_bg,
        paddingVertical: Platform.OS === 'ios' ? 16 : 12,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
});

export const MilestoneDetailsScreen = () => {
    const route = useRoute();
    const {state} = useAppContext();
    const isSurrogate = state.user?.user_type === 'surrogate';
    const bottomSheetRef = useRef<BottomSheet>(null);
    // @ts-ignore
    const {activeMilestoneId} = route.params;

    const [openDatepicker, setOpenDatepicker] = useState(false);
    const [date, setDate] = useState<any>('');
    const [activeMilestone, setActiveMilestone] = useState<any>({});
    const [showSearchResult, setShowSearchResult] = useState(false);
    const headerHeight = useHeaderHeight();

    const [locations, setLocations] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [title, setTitle] = useState('');
    const [note, setNote] = useState();
    const [otherNote, setOtherNote] = useState();
    const [shareWithSurrogate, setShareWithSurrogate] = useState(
        state.user?.user_type === 'surrogate',
    );
    const [shareWithParent, setShareWithParent] = useState(
        state.user?.user_type === 'parent',
    );
    const [shareBiggestask, setShareBiggestask] = useState(false);
    const [requestDate, setRequestDate] = useState(false);
    const [imageResponse, setImageResponse] = useState<any>(null);
    const [selectedLocation, setSelectedLocation] = useState<any>({});
    const [requestSheetClose, setRequestSheetClose] = useState(false);
    const [loading, setLoading] = useState(false);

    const {searchPlaces} = usePlaceSearchQuery();
    const toast = useToast();
    const {uploadImage} = useAttachmentsQuery();
    const {updateMilestone, createMilestone, getMilestones} =
        useMilestoneQuery();

    useEffect(() => {
        if (activeMilestoneId) {
            const m = state.milestones.find(
                (item: {id: any}) => item.id === activeMilestoneId,
            );
            if (m) {
                setActiveMilestone(m);
                if (m.date_time) {
                    setDate(new Date(m.date_time));
                }
                setNote(isSurrogate ? m.surrogate_note : m.parent_note);

                if (isSurrogate && m.share_with_surrogate) {
                    setOtherNote(m.parent_note);
                }

                if (!isSurrogate && m.share_with_parent) {
                    setOtherNote(m.surrogate_note);
                }

                setShareWithParent(m.share_with_parent);
                setShareWithSurrogate(m.share_with_surrogate);
                setRequestDate(m.request_date_from_surrogate);
                setShareBiggestask(m.share_with_biggestask);
                setTitle(m.name);
            }
        }
    }, [activeMilestoneId]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            await initSearch(searchTerm);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const initSearch = async (term: string) => {
        const response = await searchPlaces(term);
        if (response && !response?.error) {
            setLocations(response.splice(0, 3));
        }
        setShowSearchResult(true);
    };

    const onImagePress = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.5,
        });

        setImageResponse(result?.assets ? result?.assets[0] : {});
    };

    const handleMilestoneSave = async () => {
        const payload = {
            name: title,
            date_time: date ? format(date, 'yyyy-MM-dd HH:mm:ss') : null,
            address: selectedLocation
                ? `${selectedLocation?.name}, ${selectedLocation?.address}`
                : activeMilestone?.address
                    ? activeMilestone?.address
                    : null,
            surrogate_note:
                state.user?.user_type === 'surrogate' && note
                    ? note
                    : activeMilestone?.surrogate_note
                        ? activeMilestone?.surrogate_note
                        : null,
            parent_note:
                state.user?.user_type === 'parent' && note
                    ? note
                    : activeMilestone?.parent_note
                        ? activeMilestone?.parent_note
                        : null,
            feature_image: activeMilestone?.feature_image
                ? activeMilestone?.feature_image
                : null,
            share_with_biggestask: shareBiggestask ? 1 : 0,
            request_date_from_surrogate: requestDate ? 1 : 0,
            share_with_surrogate: shareWithParent ? 1 : 0,
            share_with_parent: shareWithParent ? 1 : 0,
        };

        setLoading(true);
        if (imageResponse?.uri) {
            const formData = new FormData();

            formData.append('attachment', getImagePayload(imageResponse?.uri));

            const imageUploadResponse = await uploadImage(formData);
            if (imageUploadResponse?.error) {
                toast.show('Unable to upload the image');
                return;
            }

            payload.feature_image = imageUploadResponse;
        }

        const response = activeMilestoneId
            ? await updateMilestone(payload, activeMilestone?.id)
            : await createMilestone(payload);

        setLoading(false);
        if (response?.error) {
            toast.show(response?.message);
            return;
        }

        toast.show(
            activeMilestone?.id ? 'Milestone updated' : 'Milestone created',
        );

        await getMilestones();
    };

    const renderEditableInformation = () => {
        return (
            <AppBottomSheet
                onClose={() => setRequestSheetClose(false)}
                requestClose={requestSheetClose}
                action={
                    <View>
                        <View style={[styles.row, {alignItems: 'flex-start'}]}>
                            <CalendarIcon color={Colors.grey_2} />
                            <AppSpacing isHorizontal={true} />
                            <View>
                                <AppText color={Colors.grey_2}>
                                    {date
                                        ? format(date, "MM/dd/yyyy 'at' h:mm a")
                                        : 'Not yet scheduled'}
                                </AppText>
                                <AppText
                                    variant={'caption'}
                                    color={Colors.grey_3}>
                                    (Tap to Edit)
                                </AppText>
                            </View>
                        </View>
                    </View>
                }>
                <View>
                    <View style={styles.centeredContainer}>
                        <AppText variant={'h2'}>Update information</AppText>
                        <AppSpacing />
                        <AppText textAlign={'center'} color={Colors.grey_2}>
                            You can request a Milestone date if you don't have
                            this information
                        </AppText>
                        <AppSpacing />
                    </View>
                    <AppSpacing gap={16} />
                    <View>
                        <AppText variant={'title'}>Title</AppText>
                        <AppSpacing />
                        <BottomSheetTextInput
                            cursorColor={Colors.primary}
                            style={styles.input}
                            onChangeText={e => setTitle(e)}
                            value={title}
                        />
                        <AppSpacing gap={16} />
                        <AppText variant={'title'}>Date & Time</AppText>
                        <AppSpacing />
                        <TouchableOpacity
                            onPress={() => setOpenDatepicker(true)}>
                            <View
                                style={[
                                    AppStyles.textInput,
                                    {
                                        paddingVertical: 16,
                                        height: 50,
                                        paddingHorizontal: 8,
                                    },
                                ]}>
                                <AppText>
                                    {date
                                        ? format(date, 'yyyy-MM-dd HH:mm:ss')
                                        : ''}
                                </AppText>
                            </View>
                        </TouchableOpacity>
                        <AppSpacing gap={16} />
                        <AppText variant={'title'}>Location</AppText>
                        <AppSpacing />
                        <View>
                            <BottomSheetTextInput
                                cursorColor={Colors.primary}
                                style={styles.input}
                                value={searchTerm}
                                onChangeText={e => setSearchTerm(e)}
                            />
                            {showSearchResult && (
                                <Animated.View style={styles.searchContainer}>
                                    {locations.map(
                                        (item: any, index: number) => {
                                            return (
                                                <TouchableOpacity
                                                    key={`res-${index}`}
                                                    onPress={() => {
                                                        console.log(
                                                            'item',
                                                            item,
                                                        );
                                                        setSearchTerm(
                                                            item?.name,
                                                        );
                                                        setSelectedLocation(
                                                            item,
                                                        );
                                                        setShowSearchResult(
                                                            false,
                                                        );
                                                    }}
                                                    style={styles.searchedItem}>
                                                    <View style={styles.row}>
                                                        <View>
                                                            <LocationPin />
                                                        </View>
                                                        <AppSpacing
                                                            gap={8}
                                                            isHorizontal={true}
                                                        />
                                                        <View style={{flex: 1}}>
                                                            <AppText>
                                                                {item?.name}
                                                            </AppText>
                                                            <AppSpacing />
                                                            <AppText
                                                                color={
                                                                    Colors.grey_3
                                                                }>
                                                                {item?.address}
                                                            </AppText>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        },
                                    )}
                                </Animated.View>
                            )}
                        </View>
                        <AppSpacing gap={16} />
                        {state.user?.user_type === 'parent' && (
                            <View style={[styles.row, {alignItems: 'center'}]}>
                                <Switch
                                    onValueChange={v => setRequestDate(v)}
                                    value={requestDate}
                                    style={{
                                        transform: [
                                            {
                                                scaleX:
                                                    Platform?.OS === 'ios'
                                                        ? 0.7
                                                        : 1,
                                            },
                                            {
                                                scaleY:
                                                    Platform?.OS === 'ios'
                                                        ? 0.7
                                                        : 1,
                                            },
                                        ],
                                    }}
                                />
                                <View style={{flex: 1}}>
                                    <AppText>
                                        Request a date from a gestational
                                        carrier mother
                                    </AppText>
                                </View>
                            </View>
                        )}
                        <AppSpacing gap={16} />
                        <AppButton
                            onPress={() => setRequestSheetClose(true)}
                            contentStyle={AppStyles.buttonContent}
                            mode={'contained'}
                            style={AppStyles.button}>
                            Confirm
                        </AppButton>
                        <AppSpacing gap={16} />
                    </View>
                </View>
            </AppBottomSheet>
        );
    };

    return (
        <View style={styles.container}>
            <StackHeader
                title={
                    activeMilestone?.id ? 'Edit Milestone' : 'Add New Milestone'
                }
            />
            <KeyboardAvoidingView
                keyboardVerticalOffset={Platform.select({
                    ios: 0,
                    android: headerHeight + 80,
                })}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1}}>
                    <View style={styles.innerContainer}>
                        <View style={[styles.row, {alignItems: 'flex-start'}]}>
                            <View style={styles.icon}>
                                <AppImage
                                    isLocal={!activeMilestone?.image}
                                    uri={
                                        activeMilestone?.image
                                            ? activeMilestone?.image
                                            : images.LOGO_ORIGINAL
                                    }
                                />
                            </View>
                            <View
                                style={{flex: 1, marginLeft: 8, marginTop: -4}}>
                                <AppText fontWeight={'bold'}>{title}</AppText>
                                <AppSpacing gap={8} />
                                {renderEditableInformation()}
                            </View>
                        </View>
                        <AppSpacing gap={18} />
                        {/*<View style={styles.imageContainer}>*/}
                        {/*  <Image style={styles.image} source={images.SAMPLE_UPLOAD} />*/}
                        {/*  <View style={styles.overlay}>*/}
                        {/*    <Button*/}
                        {/*      contentStyle={{flexDirection: 'row-reverse'}}*/}
                        {/*      mode={'contained'}*/}
                        {/*      icon={() => <FilePlus />}*/}
                        {/*      style={AppStyles.button}>*/}
                        {/*      Change Photo*/}
                        {/*    </Button>*/}
                        {/*  </View>*/}
                        {/*</View>*/}

                        <View
                            style={[
                                styles.uploadContainer,
                                styles.centeredContainer,
                            ]}>
                            <View style={styles.centeredContainer}>
                                <AppText>No ultrasound image available</AppText>
                                <AppSpacing gap={8} />
                                <AppText
                                    textAlign={'center'}
                                    variant={'caption'}
                                    color={Colors.grey_3}>
                                    For confirmation, you must attach a picture
                                    of the ultrasound and leave a comment.
                                </AppText>
                            </View>
                            <AppSpacing gap={16} />
                            <View style={styles.row}>
                                <AppButton
                                    contentStyle={[
                                        AppStyles.buttonContent,
                                        {
                                            flexDirection: 'row-reverse',
                                        },
                                    ]}
                                    onPress={onImagePress}
                                    mode={'contained'}
                                    icon={() => <FilePlus />}
                                    style={AppStyles.button}>
                                    Upload Picture
                                </AppButton>
                            </View>
                        </View>
                        <AppSpacing gap={16} />
                        <View>
                            <AppText variant={'title'}>Notes</AppText>
                            <AppSpacing />
                            <AppTextInput
                                multiline={true}
                                height={150}
                                numberOfLines={10}
                                value={note}
                                onValueChange={(e: any) => setNote(e)}
                            />
                        </View>
                        <AppSpacing gap={16} />
                        {otherNote && (
                            <View>
                                <AppText variant={'title'}>
                                    Note from{' '}
                                    {isSurrogate
                                        ? 'Parents'
                                        : 'Gestational Carrier'}
                                </AppText>
                                <AppSpacing />
                                <AppText>{otherNote}</AppText>
                            </View>
                        )}
                        <AppSpacing gap={16} />
                        {state.user?.user_type === 'parent' ? (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                    setShareWithSurrogate(!shareWithSurrogate)
                                }
                                style={styles.row}>
                                <Checkbox.Android
                                    status={
                                        shareWithSurrogate
                                            ? 'checked'
                                            : 'unchecked'
                                    }
                                    onPress={() => {
                                        setShareWithSurrogate(
                                            !shareWithSurrogate,
                                        );
                                    }}
                                />
                                <AppSpacing isHorizontal={true} />
                                <AppText>
                                    Share with Gestational Carrier
                                </AppText>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                    setShareWithParent(!shareWithParent)
                                }
                                style={styles.row}>
                                <Checkbox.Android
                                    status={
                                        shareWithParent
                                            ? 'checked'
                                            : 'unchecked'
                                    }
                                    onPress={() => {
                                        setShareWithParent(!shareWithParent);
                                    }}
                                />
                                <AppSpacing isHorizontal={true} />
                                <AppText>Share with Parents</AppText>
                            </TouchableOpacity>
                        )}
                        <AppSpacing gap={16} />
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setShareBiggestask(!shareBiggestask)}
                            style={styles.row}>
                            <Checkbox.Android
                                status={
                                    shareBiggestask ? 'checked' : 'unchecked'
                                }
                                onPress={() => {
                                    setShareBiggestask(!shareBiggestask);
                                }}
                            />
                            <AppSpacing isHorizontal={true} />
                            <AppText>Share with the Biggest Ask</AppText>
                        </TouchableOpacity>
                        <AppSpacing gap={16} />
                        <AppButton
                            loading={loading}
                            disabled={loading}
                            onPress={handleMilestoneSave}
                            contentStyle={[
                                AppStyles.buttonContent,
                                {flexDirection: 'row-reverse'},
                            ]}
                            mode={'contained'}
                            icon={() => <CheckCircleIcon />}
                            style={AppStyles.button}>
                            {activeMilestone?.id
                                ? 'Update Milestone'
                                : 'Create Milestone'}
                        </AppButton>
                        <AppSpacing gap={16} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <DatePicker
                modal
                open={openDatepicker}
                date={date ? date : new Date()}
                onConfirm={(d: any) => {
                    setOpenDatepicker(false);
                    setDate(d);
                }}
                onCancel={() => {
                    setOpenDatepicker(false);
                }}
            />
        </View>
    );
};
