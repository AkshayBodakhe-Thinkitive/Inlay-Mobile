import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

/** One icon as @hugeicons/core-free-icons exports it. */
export type IconSvgObject = readonly (readonly [string, { readonly [key: string]: string | number }])[];

const SHAPES = { path: Path, circle: Circle, ellipse: Ellipse, rect: Rect } as const;

type Props = { icon: IconSvgObject; size?: number; color: string; strokeWidth?: number };

/** Draws a Hugeicons icon with react-native-svg. */
export default function HugeIcon({ icon, size = 20, color, strokeWidth = 1.5 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {icon.map(([name, attrs], i) => {
        const Shape = SHAPES[name as keyof typeof SHAPES];
        if (!Shape) return null;
        const { key: _key, stroke, fill, strokeWidth: _width, ...rest } = attrs as Record<string, string | number>;
        return (
          <Shape
            key={i}
            {...(rest as object)}
            stroke={stroke ? color : undefined}
            fill={fill && fill !== 'none' ? color : 'none'}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </Svg>
  );
}
