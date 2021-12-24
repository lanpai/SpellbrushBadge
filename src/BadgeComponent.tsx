import { useRef, useEffect } from "react";
import { StyleSheet, Animated, Easing, View, Text, Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { StarIcon } from "./StarIcon";
import { DoubleContainer } from "./DoubleContainer";
import { SquareContainer } from "./SquareContainer";
import { LinearBand } from "./LinearBand";

const ROTATE_DURATION = 700
const ROTATE_X_COEFF = 0.8
const ROTATE_Y_COEFF = 0.3
const VELOCITY_X_COEFF = 0.00003
const DECELERATION_X = 0.995
const TRANSLATE_DIST = 20
const FADE_DURATION = 800
const FADE_STAGGER = 100

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

    const rotate = (
        value: Animated.ValueXY,
        toValue: any,
        duration: number = ROTATE_DURATION
    ) => {
        return Animated.timing(value, {
            toValue,
            duration,
            easing: Easing.elastic(0.8),
            useNativeDriver: true
        });
    };

    const sheenIn = () => {
        sheen.setValue(0);
        return Animated.timing(sheen, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true
        });
    };

    const animIn = () => {
        let fadeAnims = []
        for (let i = 0; i < fade.length; i++) {
            fade[i].setValue(0);
            fadeAnims.push(Animated.timing(fade[i], {
                toValue: 1,
                duration: FADE_DURATION-(i*FADE_STAGGER),
                easing: Easing.elastic(1),
                useNativeDriver: true,
                delay: ROTATE_DURATION+i*FADE_STAGGER-200
            }));
        }
        Animated.parallel(fadeAnims).start();
        sheenIn().start();
        rotate(rotation, { x: 0, y: 0 }).start();
    };

    useEffect(() => {
        animIn();
    }, []);

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            const x = ROTATE_X_COEFF*e.translationX;
            const shouldFlip = Math.floor((Math.abs(ROTATE_X_COEFF*e.translationX)+90) / 180)%2 ? 1 : -1;
            const y = shouldFlip*Math.sign(e.translationY)*Math.sqrt(Math.abs(ROTATE_Y_COEFF*e.translationY));
            rotation.setValue({ x, y });
        })
        .onEnd((e) => {
            Animated.sequence([
                Animated.decay(rotation, {
                    velocity: { x: VELOCITY_X_COEFF*e.velocityX, y: 0 },
                    deceleration: DECELERATION_X,
                    useNativeDriver: true
                }),
                Animated.parallel([
                    rotate(rotation, { x: 0, y: 0 }),
                    sheenIn()
                ])
            ]).start();
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
                        rotateY: Animated.modulo(Animated.add(rotation.x, 90), 180).interpolate({
                            inputRange: [0, 180],
                            outputRange: ["-90deg", "90deg"]
                        })
                    },
                    {
                        rotateX: rotation.y.interpolate({
                            inputRange: [-90, 90],
                            outputRange: ["-90deg", "90deg"]
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
                    <LinearBand color="#f5f5ff85" start={0.45} width={0.025} blur={0.05} />
                </Animated.View>
                <Animated.View style={{ ...styles.background, opacity: fade[0] }}>
                    <LinearBand style={{ borderRadius: 30 }} color="#03ffcc" start={0} width={0.2} />
                    <LinearBand style={{ borderRadius: 30 }} color="#cbf7e8" start={0.22} width={0.05} />
                    <LinearBand style={{ borderRadius: 30 }} color="#ee9afc" start={0.28} width={0.005} />
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
                                    translateX: Animated.modulo(Animated.add(rotation.x, 90), 180).interpolate({
                                        inputRange: [0, 180],
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
                            position: "absolute",
                            width: 258,
                            height: 258,
                            zIndex: 2,
                            transform: [
                                {
                                    translateX: Animated.modulo(Animated.add(rotation.x, 90), 180).interpolate({
                                        inputRange: [0, 180],
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
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        elevation: 1,
        backgroundColor: "#fff",
    },
    background: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: "hidden"
    },
    iconContainer: {
        padding: 4,
        marginBottom: 32,
        borderRadius: 35,
        backgroundColor: "#ee9afc"
    },
    parallaxContainer: {
        height: 250,
        aspectRatio: 1,
        overflow: "hidden",
        borderRadius: 31,
        borderWidth: 4,
        borderColor: "#03ffcc",
        backgroundColor: "#fff"
    },
    elementColor: {
        position: "absolute",
        top: -10,
        right: -10,
        width: 60,
        height: 60,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#fff",
        backgroundColor: "#fa8c73"
    },
    icon: {
        height: 286,
        aspectRatio: 1,
        top: -20,
        left: -20,
    },
    starContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -10,
        flexDirection: "row",
        justifyContent: "center"
    },
    subcontainer: {
        width: 250,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    text: {
        fontWeight: "bold"
    },
    name: {
        textAlign: "center",
        fontSize: 32,
        fontWeight: "bold"
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    }
});
