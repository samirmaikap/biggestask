import React, {useContext, useEffect, useState} from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {CommunityCard} from './CommunityCard';
import StackHeader from '../../components/StackHeader';
import {PlusCircleIcon} from '../../components/icons/PlusCircleIcon';
import {AppBottomSheet} from '../../components/AppBottomSheet';
import {AppText} from '../../components/AppText';
import {AppSpacing} from '../../components/AppSpacing';
import {CommunityForm} from './CommunityForm';
import {useNavigation} from '@react-navigation/native';
import {useAppContext} from '../../contexts/AppContext';
import useCommunityQuery from '../../hooks/useCommunityQuery';
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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const PostsScreen = () => {
    const [openSheet, setOpenSheet] = useState(false);
    const navigation = useNavigation();
    const {state, dispatch} = useAppContext();
    const {getCommunities} = useCommunityQuery();
    const [requestSheetClose, setRequestSheetClose] = useState(false);
    const [activeCommunity, setActiveCommunity] = useState(null);
    const [isPostsLoading, setIsPostsLoading] = useState(true);

    const handleOnSaved = async () => {
        setRequestSheetClose(true);
        await getCommunities();
    };

    useEffect(() => {
        (async () => {
            await getCommunities();
            setIsPostsLoading(false);
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
                        {activeCommunity ? 'Update' : 'Create'} Community
                    </AppText>
                </View>
                <AppSpacing gap={16} />
                <CommunityForm
                    community={activeCommunity}
                    onSaved={() => handleOnSaved()}
                />
            </AppBottomSheet>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <StackHeader
                title={'Community'}
                actions={[
                    <TouchableOpacity
                        activeOpacity={0.8}
                        key={'t-1'}
                        onPress={() => {
                            setActiveCommunity(null);
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
                    {isPostsLoading && (
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
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder>
                        </AppCard>
                    )}

                    {state?.communities &&
                        state.communities?.length > 0 &&
                        state.communities.map(function (item: any, index: any) {
                            return (
                                <View
                                    style={{marginVertical: 8}}
                                    key={`community-${index}`}>
                                    <CommunityCard
                                        onPress={() => {
                                            setActiveCommunity(item);
                                            setTimeout(() => {
                                                setOpenSheet(true);
                                            }, 500);
                                        }}
                                        item={item}
                                    />
                                </View>
                            );
                        })}

                    {!isPostsLoading && state.communities?.length === 0 && (
                        <View style={{marginTop: 16}}>
                            <AppText>No Community found</AppText>
                        </View>
                    )}
                </View>
            </ScrollView>
            {renderBottomSheet()}
        </View>
    );
};
