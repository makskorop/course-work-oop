import Svg, { Path } from 'react-native-svg';

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const EyeIcon: React.FC<IconProps> = ({ width = 24, height = 18, color = '#0e5c2d' }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 18"
      fill="none"
    >
      <Path
        d="M15.1434 9.00001C15.1434 10.7364 13.7359 12.1439 11.9995 12.1439C10.2632 12.1439 8.85559 10.7364 8.85559 9.00001C8.85559 7.26362 10.2632 5.85609 11.9995 5.85609C13.7359 5.85609 15.1434 7.26362 15.1434 9.00001Z"
        stroke={color}
        strokeWidth="2.09595"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 1.66418C7.30753 1.66418 3.33541 4.74825 2 9.00001C3.33539 13.2518 7.30753 16.3358 12 16.3358C16.6924 16.3358 20.6646 13.2518 22 9.00001C20.6646 4.74828 16.6924 1.66418 12 1.66418Z"
        stroke={color}
        strokeWidth="2.09595"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

