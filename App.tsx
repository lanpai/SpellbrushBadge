import { StyleSheet, View } from 'react-native';
import { BadgeComponent } from './src/BadgeComponent';

export default function App() {
    return (
        <View style={styles.container}>
            <BadgeComponent name="Name" title="Title" stars={6} imageUri="" />
        </View>
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
