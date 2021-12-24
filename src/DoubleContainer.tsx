import { StyleSheet, View, ViewProps, Text } from "react-native";

export type DoubleContainerProps = {
    leftText: string,
    rightText: string,
    leftColor: string,
    rightColor: string
};

export function DoubleContainer(props: ViewProps & DoubleContainerProps) {
    return (
        <View style={{ ...styles.container, ...props.style }}>
            <View style={{ ...styles.subcontainer, backgroundColor: props.leftColor }}>
                <Text style={{
                    ...styles.text,
                    color: props.rightColor,
                    textAlign: "left"
                }}>
                    { props.leftText }
                </Text>
            </View>
            <View style={{ ...styles.leftTriangle, borderTopColor: props.leftColor }} />
            <View style={{ ...styles.rightTriangle, borderBottomColor: props.rightColor }} />
            <View style={{ ...styles.subcontainer, backgroundColor: props.rightColor }}>
                <Text style={{
                    ...styles.text,
                    color: props.leftColor,
                    textAlign: "right"
                }}>
                    { props.rightText }
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    subcontainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "red"
    },
    leftTriangle: {
        width: 0,
        height: 0,
        marginRight: -6,
        marginLeft: -StyleSheet.hairlineWidth,
        borderTopWidth: 20,
        borderRightWidth: 20,
        borderRightColor: "transparent"
    },
    rightTriangle: {
        width: 0,
        height: 0,
        marginRight: -StyleSheet.hairlineWidth,
        marginLeft: -6,
        borderLeftWidth: 20,
        borderBottomWidth: 20,
        borderLeftColor: "transparent"
    },
    text: {
        marginLeft: 5,
        marginRight: 5,
        fontSize: 13,
    }
});
