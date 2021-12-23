import { useRef, useEffect } from 'react';
import { StyleSheet, Animated, View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
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
    const fade = [
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current
    ];
    const rotateY = useRef(new Animated.Value(90)).current;

    const ROTATE_DURATION = 1000

    const fadeIn = () => {
        for (let i = 0; i < fade.length; i++) {
            const DELTA = 100
            fade[i].setValue(0);
            Animated.timing(fade[i], {
                toValue: 1,
                duration: 1000-(i*DELTA),
                useNativeDriver: true,
                delay: ROTATE_DURATION+i*DELTA
            }).start();
        }
    };

    const rotate = (toValue: number, duration: number = ROTATE_DURATION) => {
        Animated.timing(rotateY, {
            toValue,
            duration,
            useNativeDriver: true
        }).start();
    };

    useEffect(() => {
        fadeIn();
        rotate(0);
    }, []);

    const gesture = Gesture.Pan()
        .onUpdate((e) => {
            console.log(e);
            rotate(
                Math.sign(e.translationX)
                *(((Math.abs(e.translationX)+90)%180)-90),
                0
            );
        })
        .onEnd(() => {
            rotate(0);
        });

    const TRANSLATE_DIST = 15

    let stars = [];
    for (let i = 0; i < props.stars; i++)
        stars.push(<StarIcon key={i} size={35} stroke="#ee9afc" color="#03ffcc" strokeWidth={45} />);

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={{
                ...styles.container,
                transform: [{
                    rotateY: rotateY.interpolate({
                        inputRange: [-90, 90],
                        outputRange: ['-90deg', '90deg']
                    })
                }]
            }}>
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
                <Animated.View style={{
                    ...styles.iconContainer,
                    opacity: fade[0],
                    transform: [{
                        translateY: fade[0].interpolate({
                            inputRange: [0, 1],
                            outputRange: [TRANSLATE_DIST, 0]
                        })
                    }]
                }}>
                    <Image style={ styles.icon } source={require("../assets/waifu.png")} />
                    <View style={ styles.elementColor } />
                    <View style={ styles.starContainer }>
                        { stars }
                    </View>
                </Animated.View>
                <View style={ styles.subcontainer }>
                    <Animated.View style={{
                        flex: 3,
                        opacity: fade[3],
                        transform: [{
                            translateY: fade[3].interpolate({
                                inputRange: [0, 1],
                                outputRange: [TRANSLATE_DIST, 0]
                            })
                        }]
                    }}>
                        <Text style={{ ...styles.text }}>Lorem ipsum</Text>
                    </Animated.View>
                    <Animated.View style={{
                        flex: 4,
                        opacity: fade[2],
                        transform: [{
                            translateY: fade[2].interpolate({
                                inputRange: [0, 1],
                                outputRange: [TRANSLATE_DIST, 0]
                            })
                        }]
                    }}>
                        <DoubleContainer
                            leftText="Fire"
                            rightText="Autumn"
                            leftColor="#fa8c73"
                            rightColor="#fedbd7"
                        />
                    </Animated.View>
                </View>
                <View style={ styles.subcontainer }>
                    <Animated.View style={{
                        opacity: fade[5],
                        transform: [{
                            translateY: fade[5].interpolate({
                                inputRange: [0, 1],
                                outputRange: [TRANSLATE_DIST, 0]
                            })
                        }]
                    }}>
                        <SquareContainer color="#666">Consectetur</SquareContainer>
                    </Animated.View>
                    <Animated.View style={{
                        opacity: fade[4],
                        transform: [{
                            translateY: fade[4].interpolate({
                                inputRange: [0, 1],
                                outputRange: [TRANSLATE_DIST, 0]
                            })
                        }]
                    }}>
                        <SquareContainer color="#000">Adipiscing</SquareContainer>
                    </Animated.View>
                </View>
                <Animated.View style={{
                    opacity: fade[1],
                    transform: [{
                        translateY: fade[1].interpolate({
                            inputRange: [0, 1],
                            outputRange: [TRANSLATE_DIST, 0]
                        })
                    }]
                }}>
                    <Text style={ styles.name }>{ props.name }</Text>
                    <Text style={ styles.title }>{ props.title }</Text>
                </Animated.View>
            </Animated.View>
        </GestureDetector>
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
        marginBottom: 32,
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
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -10,
        flexDirection: 'row',
        justifyContent: 'center'
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
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold'
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
