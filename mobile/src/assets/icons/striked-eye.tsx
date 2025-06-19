import Svg, { Path } from 'react-native-svg';

type IconProps = {
  width?: number;
  height?: number;
  strokeColor?: string;
};

export const StrikedEyeIcon: React.FC<IconProps> = ({
  width = 24,
  height = 22,
  strokeColor = '#0e5c2d',
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 22"
      fill="none"
    >
      <Path
        d="M2.56799 1.56824L21.4316 20.4318M9.74065 8.81358C9.19293 9.37945 8.85586 10.1503 8.85586 11C8.85586 12.7364 10.2635 14.144 11.9998 14.144C12.8617 14.144 13.6427 13.7971 14.2106 13.2354M6.23592 5.39037C4.24549 6.70369 2.72941 8.67766 2 11C3.33539 15.2518 7.30755 18.3359 12 18.3359C14.0843 18.3359 16.0265 17.7274 17.6586 16.6784M10.9518 3.71595C11.2966 3.68173 11.6463 3.66419 12 3.66419C16.6925 3.66419 20.6647 6.7483 22 11C21.7058 11.9369 21.2835 12.817 20.7537 13.62"
        stroke={strokeColor}
        strokeWidth="2.09596"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
