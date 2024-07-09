import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';

export default function MapaScreen() {
    const [location, setLocation] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const mapRef = useRef(""); 

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                setLocation(location.coords); 
            } catch (error) {
                console.error("Error fetching location:", error);
                setErrorMsg('Error fetching location');
            }
        })();
    }, []);

    const goToCurrentLocation = () => {
        if (mapRef.current && location) {
            mapRef.current.animateToRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        }
    };

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: location?.latitude || 37.78825,
                    longitude: location?.longitude || -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {location && (
                    <Marker
                        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                        title="Mi Ubicación"
                    />
                )}
            </MapView>
            <Button title="Mi Ubicación" onPress={goToCurrentLocation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});
