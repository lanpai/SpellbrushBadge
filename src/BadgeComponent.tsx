import { StyleSheet, View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StarIcon } from './StarIcon';
import { DoubleContainer } from './DoubleContainer';
import { SquareContainer } from './SquareContainer';

export type BadgeComponentProps = {
    name: string;
    title: string;
    stars: number;
    imageUri: string;
};

export function BadgeComponent(props: BadgeComponentProps) {

    let stars = []
    for (let i = 0; i < props.stars; i++)
        stars.push(<StarIcon key={i} size={35} stroke="#ee9afc" color="#03ffcc" strokeWidth={45} />)

    return (
        <View style={ styles.container }>
            <LinearGradient
                style={ styles.background }
                colors={[
                    '#03ffcc',
                    '#fff0', '#fff0',
                    '#cbf7e8', '#cbf7e8',
                    '#fff0', '#fff0',
                    '#ee9afc', '#ee9afc',
                    '#fff0'
                ]}
                locations={[
                    0.2, 0.2,
                    0.22, 0.22,
                    0.27, 0.27,
                    0.28, 0.28,
                    0.285, 0.285
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
            <View style={ styles.iconContainer }>
                <Image style={ styles.icon } source={require("../assets/waifu.png")} />
                <View style={ styles.elementColor } />
            </View>
            <View style={ styles.starContainer }>
                { stars }
            </View>
            <View style={ styles.subcontainer }>
                <Text style={{ ...styles.text, flex: 3 }}>Lorem ipsum</Text>
                <DoubleContainer
                    style={{ flex: 4 }}
                    leftText="Fire"
                    rightText="Autumn"
                    leftColor="#fa8c73"
                    rightColor="#fedbd7"
                />
            </View>
            <View style={ styles.subcontainer }>
                <SquareContainer color="#666">Consectetur</SquareContainer>
                <SquareContainer color="#000">Adipiscing</SquareContainer>
            </View>
            <Text style={ styles.name }>{ props.name }</Text>
            <Text style={ styles.title }>{ props.title }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 35,
        paddingTop: 60,
        paddingBottom: 50,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        elevation: 1,
        backgroundColor: '#fff',
    },
    background: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderRadius: 30,
    },
    iconContainer: {
        padding: 4,
        borderRadius: 35,
        backgroundColor: '#ee9afc'
    },
    elementColor: {
        position: 'absolute',
        top: -10,
        right: -10,
        width: 60,
        height: 60,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: '#fa8c73'
    },
    icon: {
        height: 250,
        aspectRatio: 1,
        borderRadius: 31,
        borderWidth: 4,
        borderColor: '#03ffcc'
    },
    starContainer: {
        flexDirection: 'row',
        marginTop: -28,
        marginBottom: 20
    },
    subcontainer: {
        width: 250,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontWeight: 'bold'
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
