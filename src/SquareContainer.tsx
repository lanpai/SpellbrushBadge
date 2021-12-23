import { StyleSheet, View, Text, TextProps } from 'react-native';
import { SquareIcon } from './SquareIcon';

export type SquareContainerProps = {
    color: string
};

export function SquareContainer(props: TextProps & SquareContainerProps) {
    return (
        <View style={ styles.container }>
            <SquareIcon size={14} color={props.color} />
            <Text style={{ ...styles.text, color: props.color }}>{ props.children }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginLeft: 5,
        fontWeight: 'bold'
    }
});
