import { View } from 'react-native'

export type SquareIconProps = {
    size: number,
    color: string
}

export function SquareIcon(props: SquareIconProps) {
    return (
        <View style={{
            height: props.size,
            width: props.size,
            backgroundColor: props.color
        }} />
    );
}
