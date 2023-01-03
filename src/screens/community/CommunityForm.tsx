import React, {useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppText} from '../../components/AppText';
import {Colors} from '../../theme/colors';
import {Button} from 'react-native-paper';
import AppStyles from '../../theme/AppStyles';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {AppSpacing} from '../../components/AppSpacing';
import {PlusIcon} from '../../components/icons/PlusIcon';
import {AppImage} from '../../components/AppImage';
import {images} from '../../utils/constants';
import AppButton from '../../components/AppButton';
import useCommunityQuery from '../../hooks/useCommunityQuery';
import {useToast} from 'react-native-toast-notifications';
import {launchImageLibrary} from 'react-native-image-picker';
import useAttachmentsQuery from '../../hooks/useAttachmentsQuery';
import {getImagePayload} from '../../utils/utils';
import {useAppContext} from '../../contexts/AppContext';

const styles = StyleSheet.create({
    inputGroup: {
        marginVertical: 8,
        zIndex: -1,
    },
    input: {
        backgroundColor: Colors.grey_bg,
        paddingVertical: Platform.OS === 'ios' ? 16 : 12,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
    row: {
        flexDirection: 'row',
    },
});

type Props = {
    onSaved: Function;
};

export const CommunityForm = (props: Props) => {
    const {onSaved} = props;
    const {createCommunities, getCommunities} = useCommunityQuery();
    const toast = useToast();
    const {dispatch} = useAppContext();
    const [imageResponse, setImageResponse] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const initialPayload = {
        title: '',
        description: '',
        forum_link: '',
        insta_link: '',
    };
    const [payload, setPayload] = useState(initialPayload);
    const {uploadImage} = useAttachmentsQuery();

    const handleCreate = async () => {
        if (!payload.title) {
            toast.show('Please enter a title');
            return;
        }

        if (!payload?.forum_link && !payload?.insta_link) {
            toast.show('Please enter a Forum or Insta Link');
            return;
        }

        setLoading(true);
        let imageUrl = '';
        if (imageResponse?.uri) {
            const formData = new FormData();

            formData.append('attachment', getImagePayload(imageResponse?.uri));

            const imageUploadResponse = await uploadImage(formData);
            if (imageUploadResponse?.error) {
                toast.show('Unable to upload the image');
                return;
            }

            imageUrl = imageUploadResponse;
        }

        const response = await createCommunities({
            ...payload,
            image: imageUrl,
        });

        setLoading(false);
        if (response?.error) {
            toast.show('Unable to create community');
            return;
        }

        setPayload(initialPayload);
        setImageResponse({});

        toast.show('Community Created');
        onSaved();
    };

    const handleInput = (name: string, value: string) => {
        setPayload({
            ...payload,
            [name]: value,
        });
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

    return (
        <View style={{backgroundColor: 'white'}}>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Title</AppText>
                <AppSpacing />
                <BottomSheetTextInput
                    onChangeText={e => handleInput('title', e)}
                    cursorColor={Colors.primary}
                    style={[styles.input]}
                    value={payload?.title}
                />
            </View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Description</AppText>
                <AppSpacing />
                <BottomSheetTextInput
                    onChangeText={e => handleInput('description', e)}
                    cursorColor={Colors.primary}
                    style={[styles.input]}
                    value={payload?.description}
                />
            </View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Link to Forum</AppText>
                <AppSpacing />
                <BottomSheetTextInput
                    onChangeText={e => handleInput('forum_link', e)}
                    cursorColor={Colors.primary}
                    style={[styles.input]}
                    value={payload?.forum_link}
                />
            </View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Link to Instagram</AppText>
                <AppSpacing />
                <BottomSheetTextInput
                    onChangeText={e => handleInput('insta_link', e)}
                    cursorColor={Colors.primary}
                    style={[styles.input]}
                    value={payload?.insta_link}
                />
            </View>
            <View style={styles.inputGroup}>
                <View
                    style={[
                        styles.row,
                        {justifyContent: 'center', alignItems: 'center'},
                    ]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => onImagePress()}>
                        <AppImage
                            uri={
                                imageResponse?.uri
                                    ? imageResponse?.uri
                                    : images.LOGO_PLACEHOLDER
                            }
                            isLocal={!imageResponse?.uri}
                            size={100}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <AppSpacing gap={16} />
            <AppButton
                loading={loading}
                disabled={loading}
                onPress={handleCreate}
                contentStyle={AppStyles.buttonContent}
                mode={'contained'}
                icon={() => <PlusIcon color={'white'} />}
                style={AppStyles.button}>
                Add New Community
            </AppButton>
            <AppSpacing gap={16} />
        </View>
    );
};
