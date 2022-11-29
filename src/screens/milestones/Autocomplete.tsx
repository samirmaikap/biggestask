import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import StackHeader from '../../components/StackHeader';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export const AutocompleteScreen = () => {
return(
    <View style={styles.container}>
        <StackHeader title={"Search Location"}/>
        <View>
            <GooglePlacesAutocomplete
                placeholder='Search'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}
                query={{
                    key: 'YOUR API KEY',
                    language: 'en',
                }}
            />
        </View>
    </View>
)
}
