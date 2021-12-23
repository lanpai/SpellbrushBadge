import { StyleSheet, ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export type LinearBandProps = {
    color: string,
    start: number,
    width: number,
    blur?: number
};

export function LinearBand(props: ViewProps & LinearBandProps) {
    const blur = props.blur || 0;

    return (
        <LinearGradient
            style={{ ...styles.container, ...props.style }}
            colors={[
                '#fff0',
                props.color, props.color,
                '#fff0'
            ]}
            locations={[
                props.start-blur, props.start,
                props.start+props.width, props.start+props.width+blur
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    }
});
