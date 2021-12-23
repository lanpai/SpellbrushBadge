import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BadgeComponent } from './src/BadgeComponent';

export default function App() {
    return (
        <GestureHandlerRootView style={styles.container}>
                <BadgeComponent name="Name" title="Title" stars={6} imageUri="" />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
