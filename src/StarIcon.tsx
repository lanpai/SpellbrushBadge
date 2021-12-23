import { Svg, Path, SvgProps } from 'react-native-svg';

export type StarIconProps = {
    borderWidth?: number;
    color?: string;
    size?: number;
    stroke?: string;
    strokeWidth?: number;
};

export function StarIcon(props: SvgProps & StarIconProps) {
    return (
        <Svg
            width={props.size}
            height={props.size}
            viewBox="0 0 576 512"
            preserveAspectRatio="xMidYMid meet"
            {...props}
        >
            <Path
                fill={props.color || "currentColor"}
                stroke={props.stroke || props.color}
                strokeWidth={props.strokeWidth}
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
            />
        </Svg>
    );
}
