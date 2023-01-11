import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import StackHeader from '../../components/StackHeader';
import {ContactCard} from './ContactCard';
import {PlusCircleIcon} from '../../components/icons/PlusCircleIcon';
import {AppBottomSheet} from '../../components/AppBottomSheet';
import {AppText} from '../../components/AppText';
import {ContactForm} from './ContactForm';
import {AppSpacing} from '../../components/AppSpacing';
import useContactQuery from '../../hooks/useContactQuery';
import {useAppContext} from '../../contexts/AppContext';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {AppCard} from '../../components/AppCard';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        padding: 16,
    },
});

export const ProvidersScreen = () => {
    const {state} = useAppContext();
    const [openSheet, setOpenSheet] = useState(false);
    const {getContacts} = useContactQuery();
    const [requestSheetClose, setRequestSheetClose] = useState(false);
    const [activeContactId, setActiveContactId] = useState(null);
    const [isContactsLoading, setIsContactsLoading] = useState(true);

    const handleOnContactSave = async () => {
        setRequestSheetClose(true);
        await getContacts();
    };

    useEffect(() => {
        (async () => {
            await getContacts();
            setIsContactsLoading(false);
        })();
    }, []);

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
                    <AppText variant={'h2'}>
                        {activeContactId ? 'Update Contact' : 'Create Contact'}
                    </AppText>
                </View>
                <AppSpacing gap={16} />
                <ContactForm
                    contact={
                        activeContactId
                            ? state.contacts.find(
                                (item: {id: number}) =>
                                    item.id === activeContactId,
                            )
                            : null
                    }
                    onSaved={handleOnContactSave}
                />
            </AppBottomSheet>
        );
    };

    const handleOnEditPress = (id: any) => {
        setOpenSheet(true);
        setActiveContactId(id);
    };

    return (
        <View style={styles.container}>
            <StackHeader
                title={'Your Contacts'}
                actions={[
                    <TouchableOpacity
                        activeOpacity={0.8}
                        key={'t-1'}
                        onPress={() => {
                            setActiveContactId(null);
                            setOpenSheet(true);
                        }}>
                        <PlusCircleIcon />
                    </TouchableOpacity>,
                ]}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.innerContainer}>
                    {isContactsLoading && (
                        <AppCard padding={16}>
                            <SkeletonPlaceholder borderRadius={4}>
                                <SkeletonPlaceholder.Item
                                    flexDirection="row"
                                    alignItems="center">
                                    <SkeletonPlaceholder.Item
                                        width={60}
                                        height={60}
                                        borderRadius={50}
                                    />
                                    <SkeletonPlaceholder.Item marginLeft={20}>
                                        <SkeletonPlaceholder.Item
                                            width={200}
                                            height={20}
                                        />
                                        <SkeletonPlaceholder.Item
                                            marginTop={6}
                                            width={80}
                                            height={20}
                                        />
                                        <SkeletonPlaceholder.Item
                                            marginTop={6}
                                            width={80}
                                            height={20}
                                        />
                                        <SkeletonPlaceholder.Item
                                            marginTop={6}
                                            width={80}
                                            height={20}
                                        />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder>
                        </AppCard>
                    )}

                    {state.contacts.map((item: {id: any}, index: any) => {
                        return (
                            <View
                                style={{marginVertical: 8}}
                                key={`contacts-${index}`}>
                                <ContactCard
                                    item={item}
                                    onEditPress={() =>
                                        handleOnEditPress(item?.id)
                                    }
                                />
                            </View>
                        );
                    })}
                    {!isContactsLoading && state.contacts?.length === 0 && (
                        <View style={{marginTop: 16}}>
                            <AppText>No contacts found</AppText>
                        </View>
                    )}
                </View>
            </ScrollView>
            {renderBottomSheet()}
        </View>
    );
};
