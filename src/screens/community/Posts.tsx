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

    const handleOnSaved = () => {
        setOpenSheet(false);
    };

    useEffect(() => {
        (async () => {
            await getCommunities();
        })();
    }, []);

    const renderBottomSheet = () => {
        return (
            <AppBottomSheet
                isOpen={openSheet}
                onClose={() => setOpenSheet(false)}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <AppText variant={'h2'}>Create Community</AppText>
                </View>
                <AppSpacing gap={16} />
                <CommunityForm onSaved={() => handleOnSaved()} />
            </AppBottomSheet>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <StackHeader
                title={'Community'}
                actions={[
                    <TouchableOpacity onPress={() => setOpenSheet(true)}>
                        <PlusCircleIcon />
                    </TouchableOpacity>,
                ]}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.innerContainer}>
                    {state?.communities.length > 0 ? (
                        state.communities.map(function (item: any, index: any) {
                            return (
                                <View
                                    style={{marginVertical: 8}}
                                    key={`community-${index}`}>
                                    <CommunityCard item={item} />
                                </View>
                            );
                        })
                    ) : (
                        <AppText>No communities created Yet</AppText>
                    )}
                </View>
            </ScrollView>
            {renderBottomSheet()}
        </View>
    );
};
