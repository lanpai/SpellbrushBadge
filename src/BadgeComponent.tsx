import { useRef, useEffect } from 'react';
import { StyleSheet, Animated, Easing, View, Text, Image } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { StarIcon } from './StarIcon';
import { DoubleContainer } from './DoubleContainer';
import { SquareContainer } from './SquareContainer';
import { LinearBand } from './LinearBand';

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
    const rotation = useRef(new Animated.ValueXY({ x: 90, y: 0 })).current;
    const sheen = useRef(new Animated.Value(0)).current;

    const ROTATE_DURATION = 600
    const ROTATE_X_COEFF = 0.8
    const ROTATE_Y_COEFF = 0.3
    const TRANSLATE_DIST = 20

    const fadeIn = () => {
        for (let i = 0; i < fade.length; i++) {
            const DELTA = 100
            fade[i].setValue(0);
            Animated.timing(fade[i], {
                toValue: 1,
                duration: 800-(i*DELTA),
                easing: Easing.elastic(1),
                useNativeDriver: true,
                delay: ROTATE_DURATION+i*DELTA-200
            }).start();
        }
    };

    const rotate = (
        value: Animated.ValueXY,
        toValue: any,
        duration: number = ROTATE_DURATION
    ) => {
        Animated.timing(value, {
            toValue,
            duration,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true
        }).start();
    };

    const sheenIn = () => {
        sheen.setValue(0);
        Animated.timing(sheen, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true
        }).start();
    };

    const animIn = () => {
        fadeIn();
        sheenIn();
        rotate(rotation, { x: 0, y: 0 });
    };

    useEffect(() => {
        animIn();
    }, []);

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            const x = Math.sign(e.translationX)*(((Math.abs(ROTATE_X_COEFF*e.translationX)+90)%180)-90);
            const shouldFlip = Math.floor((Math.abs(ROTATE_X_COEFF*e.translationX)+90) / 180)%2 ? 1 : -1;
            const y = shouldFlip*Math.sign(e.translationY)*Math.sqrt(Math.abs(ROTATE_Y_COEFF*e.translationY));
            rotate(rotation, { x, y }, 0);
        })
        .onEnd(() => {
            rotate(rotation, { x: 0, y: 0 });
            sheenIn();
        });

    const tapGesture = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
            rotation.setValue({ x: 90, y: 0 });
            animIn();
        });

    const gesture = Gesture.Race(panGesture, tapGesture);

    let stars = [];
    for (let i = 0; i < props.stars; i++)
        stars.push(<StarIcon key={i} size={35} stroke="#ee9afc" color="#03ffcc" strokeWidth={45} />);

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={{
                ...styles.container,
                transform: [
                    {
                        rotateY: rotation.x.interpolate({
                            inputRange: [-90, 90],
                            outputRange: ['-90deg', '90deg']
                        })
                    },
                    {
                        rotateX: rotation.y.interpolate({
                            inputRange: [-90, 90],
                            outputRange: ['-90deg', '90deg']
                        })
                    }
                ]
            }}>
                <Animated.View
                    style={{
                        ...styles.background,
                        zIndex: 5,
                        opacity: sheen.interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: [0, 1, 0]
                        }),
                        transform: [{
                            translateY: sheen.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-90, 90]
                            })
                        }]
                    }}
                >
                    <LinearBand color='#f5f5ff85' start={0.45} width={0.025} blur={0.05} />
                </Animated.View>
                <Animated.View style={{ ...styles.background, opacity: fade[0] }}>
                    <LinearBand style={{ borderRadius: 30 }} color='#03ffcc' start={0} width={0.2} />
                    <LinearBand style={{ borderRadius: 30 }} color='#cbf7e8' start={0.22} width={0.05} />
                    <LinearBand style={{ borderRadius: 30 }} color='#ee9afc' start={0.28} width={0.005} />
                </Animated.View>
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
                    <View style={ styles.parallaxContainer }>
                        <Animated.View style={{
                            transform: [
                                {
                                    translateX: rotation.x.interpolate({
                                        inputRange: [-90, 90],
                                        outputRange: [200, -200]
                                    })
                                },
                                {
                                    translateY: rotation.y.interpolate({
                                        inputRange: [-90, 90],
                                        outputRange: [-200, 200]
                                    })
                                }
                            ]
                        }}>
                            <Image style={ styles.icon } source={require("../assets/waifu.png")} />
                        </Animated.View>
                    </View>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            width: 258,
                            height: 258,
                            zIndex: 2,
                            transform: [
                                {
                                    translateX: rotation.x.interpolate({
                                        inputRange: [-90, 90],
                                        outputRange: [-80, 80]
                                    })
                                },
                                {
                                    translateY: rotation.y.interpolate({
                                        inputRange: [-90, 90],
                                        outputRange: [80, -80]
                                    })
                                }
                            ]
                        }}
                    >
                        <View style={ styles.elementColor } />
                        <View style={ styles.starContainer }>
                            { stars }
                        </View>
                    </Animated.View>
                </Animated.View>
                <View style={ styles.subcontainer }>
                    <Animated.Text style={{
                        ...styles.text,
                        flex: 3,
                        opacity: fade[3],
                        transform: [{
                            translateY: fade[3].interpolate({
                                inputRange: [0, 1],
                                outputRange: [TRANSLATE_DIST, 0]
                            })
                        }]
                    }}>
                        Lorem ipsum
                    </Animated.Text>
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
        overflow: 'hidden'
    },
    iconContainer: {
        padding: 4,
        marginBottom: 32,
        borderRadius: 35,
        backgroundColor: '#ee9afc'
    },
    parallaxContainer: {
        height: 250,
        aspectRatio: 1,
        overflow: 'hidden',
        borderRadius: 31,
        borderWidth: 4,
        borderColor: '#03ffcc',
        backgroundColor: '#fff'
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
        height: 286,
        aspectRatio: 1,
        top: -20,
        left: -20,
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
