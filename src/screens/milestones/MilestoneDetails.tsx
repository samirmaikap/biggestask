import React, {useState} from 'react';
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
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import DatePicker from 'react-native-date-picker';
import {LocationPin} from '../../components/icons/LocationPin';
import {format} from 'date-fns';
import AppButton from '../../components/AppButton';
import App from '../../../App';

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
        height: 200,
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
    const [note, setNote] = useState();
    const [checked, setChecked] = useState(false);
    const [openDatepicker, setOpenDatepicker] = useState(false);
    const [date, setDate] = useState(new Date());
    // const {data, setData} = useState({
    //     title: '',
    //     date: '',
    //     time: '',
    //     location: '',
    //     request_date: '',
    // });
    const [showSearchResult, setShowSearchResult] = useState(false);

    // const updateData = (field: string, value: any) => {
    //     // setData((prevState: any) => ({
    //     //   ...prevState,
    //     //   field: value,
    //     // }));
    // };

    const locations = [
        {
            name: 'Grand Rapids',
            address: ' 3230 Eagle Park Drive NE, Suite 100',
        },
        {
            name: 'Grand Rapids',
            address: ' 3230 Eagle Park Drive NE, Suite 100',
        },
        {
            name: 'Grand Rapids',
            address: ' 3230 Eagle Park Drive NE, Suite 100',
        },
        {
            name: 'Grand Rapids',
            address: ' 3230 Eagle Park Drive NE, Suite 100',
        },
        {
            name: 'Grand Rapids',
            address: ' 3230 Eagle Park Drive NE, Suite 100',
        },
    ];

    const renderEditableInformation = () => {
        return (
            <AppBottomSheet
                action={
                    <View>
                        <View style={[styles.row, {alignItems: 'flex-start'}]}>
                            <CalendarIcon color={Colors.grey_2} />
                            <AppSpacing isHorizontal={true} />
                            <View>
                                <AppText color={Colors.grey_2}>
                                    09/22/2021 at 9:30AM
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
                                    {format(
                                        new Date(2014, 1, 11),
                                        'yyyy-MM-dd',
                                    )}
                                </AppText>
                            </View>
                        </TouchableOpacity>
                        <AppSpacing gap={16} />
                        <AppText variant={'title'}>Location</AppText>
                        <AppSpacing />
                        <View>
                            <BottomSheetTextInput
                                onFocus={() => setShowSearchResult(true)}
                                onBlur={() => setShowSearchResult(false)}
                                cursorColor={Colors.primary}
                                style={styles.input}
                            />
                            {showSearchResult && (
                                <Animated.View style={styles.searchContainer}>
                                    {locations.map(item => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    setShowSearchResult(false)
                                                }
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
                                    })}
                                </Animated.View>
                            )}
                        </View>
                        <AppSpacing gap={16} />
                        <View style={[styles.row, {alignItems: 'center'}]}>
                            <Switch
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
                                    Request a date from a gestational carrier
                                    mother
                                </AppText>
                            </View>
                        </View>
                        <AppSpacing gap={16} />
                        <AppButton
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
            <StackHeader title={'Edit Milestone'} />
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1}}>
                    <View style={styles.innerContainer}>
                        <View style={[styles.row, {alignItems: 'flex-start'}]}>
                            <View style={styles.icon}>
                                <Image
                                    style={styles.image}
                                    source={images.PREGNANT}
                                />
                            </View>
                            <View
                                style={{flex: 1, marginLeft: 8, marginTop: -4}}>
                                <AppText fontWeight={'bold'}>
                                    Fertility Clinic Graduation/ultrasound
                                </AppText>
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
                                onValueChange={(e: any) =>
                                    setNote(e.target.value)
                                }
                            />
                        </View>
                        <AppSpacing gap={16} />
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setChecked(!checked)}
                            style={styles.row}>
                            <Checkbox.Android
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                            />
                            <AppSpacing isHorizontal={true} />
                            <AppText>Share with the Biggest Ask</AppText>
                        </TouchableOpacity>
                        <AppSpacing gap={16} />
                        <AppButton
                            contentStyle={[
                                AppStyles.buttonContent,
                                {flexDirection: 'row-reverse'},
                            ]}
                            mode={'contained'}
                            icon={() => <CheckCircleIcon />}
                            style={AppStyles.button}>
                            Update Milestone
                        </AppButton>
                        <AppSpacing gap={16} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <DatePicker
                modal
                open={openDatepicker}
                date={date}
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
