import React from "react";
import { View } from "react-native";
import Svg, {
  // Circle,
  // Ellipse,
  // G,
  // Text,
  // TSpan,
  // TextPath,
  Path,
  // Polygon,
  // Polyline,
  // Line,
  Rect,
  // Use,
  // Image,
  // Symbol,
  // Defs,
  // LinearGradient,
  // RadialGradient,
  // Stop,
  // ClipPath,
  // Pattern,
  // Mask,
} from "react-native-svg";

// export const MainBackground = () => (
//   <LinearGradient
//     start={{ x: 0.05, y: 0 }}
//     end={{ x: 0.95, y: 0 }}
//     colors={['#ccc', '#999']}
//     style={{
//       position: 'absolute',
//       height: '100%',
//       width: '100%',
//     }}
//   />
// )

export const AmountMinus = () => (
  <Svg
    width="12"
    height="2"
    viewBox="0 0 12 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect width="12" height="2" fill="#129409" />
  </Svg>
);

export const AmountPlus = () => (
  <Svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 5V0H5V5H0V7H5V12H7V7H12V5H7Z"
      fill="#129409"
    />
  </Svg>
);

export const FilterOrder = () => (
  <Svg
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M6 11.41L0 5.41L1.41 4L6 8.59L14.59 0L16 1.41L6 11.41Z"
      fill="#4F4F4F"
    />
  </Svg>
);

export const FooterFilterIcon = () => (
  <Svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M17 16V19"
      stroke="white"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <Path
      d="M17 1V12"
      stroke="white"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <Path
      d="M10 12V19"
      stroke="white"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <Path
      d="M10 1V8"
      stroke="white"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <Path
      d="M3 8V19"
      stroke="white"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <Path
      d="M3 1V4"
      stroke="white"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <Path
      d="M5 8H1"
      stroke="white"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <Path
      d="M12 12H8"
      stroke="white"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <Path
      d="M19 16H15"
      stroke="white"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
  </Svg>
);

export const FooterRepeatIcon = () => (
  <Svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M24 6.84849L19.9082 5.33334L18 8.66667"
      stroke="white"
      strokeWidth="2.5"
    />
    <Path
      d="M15.3333 13.537C15.3333 15.2655 13.8409 16.6667 12 16.6667C10.159 16.6667 8.66663 15.2655 8.66663 13.537C8.66663 11.8086 12 8 12 8C12 8 15.3333 11.8086 15.3333 13.537Z"
      stroke="white"
      strokeWidth="2.5"
    />
    <Path
      d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.89614 21.3503 7.94402 20.2406 6.33333"
      stroke="white"
      strokeWidth="2.5"
    />
  </Svg>
);

export const HeaderBackIcon = () => (
  <Svg
    width="12"
    height="20"
    viewBox="0 0 12 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M10 2L2 10L10 18"
      stroke="#0E2B45"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const HeaderCartIcon = () => (
  <Svg
    width="28"
    height="26"
    viewBox="0 0 28 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M11.5 26C12.8807 26 14 24.8807 14 23.5C14 22.1193 12.8807 21 11.5 21C10.1193 21 8.99999 22.1193 8.99999 23.5C8.99999 24.8807 10.1193 26 11.5 26Z"
      fill="#0E2B45"
    />
    <Path
      d="M22.5345 26C23.9152 26 25.0345 24.8807 25.0345 23.5C25.0345 22.1193 23.9152 21 22.5345 21C21.1538 21 20.0345 22.1193 20.0345 23.5C20.0345 24.8807 21.1538 26 22.5345 26Z"
      fill="#0E2B45"
    />
    <Path
      d="M2 2H6.0513L9.96288 18H22.955L26 6.69259H11.2824"
      stroke="#0E2B45"
      strokeWidth="2.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MenuAccessoriesIcon = ({ color }) => (
  <Svg
    width="28"
    height="36"
    viewBox="0 0 28 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M8 7V5.6C8 4.10011 8 3.35016 8.38197 2.82443C8.50533 2.65464 8.65464 2.50533 8.82443 2.38197C9.35016 2 10.1001 2 11.6 2H16.4C17.8999 2 18.6498 2 19.1756 2.38197C19.3454 2.50533 19.4947 2.65464 19.618 2.82443C20 3.35016 20 4.10011 20 5.6V7"
      stroke={color}
      strokeWidth="2.5"
    />
    <Rect
      x="2"
      y="7"
      width="24"
      height="27"
      rx="6"
      stroke={color}
      strokeWidth="2.5"
    />
    <Path d="M2.5 12H26" stroke={color} strokeWidth="2.5" />
    <Path
      d="M18 24.6667C18 27.0599 16.2091 29 14 29C11.7909 29 10 27.0599 10 24.6667C10 22.2734 14 17 14 17C14 17 18 22.2734 18 24.6667Z"
      stroke={color}
      strokeWidth="2.5"
    />
  </Svg>
);

export const MenuHistoryIcon = ({ color }) => (
  <Svg
    width="36"
    height="34"
    viewBox="0 0 36 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path d="M35 9.27273L28.8623 7L26 12" stroke={color} strokeWidth="2.5" />
    <Path
      d="M22 19.3056C22 21.8982 19.7614 24 17 24C14.2386 24 12 21.8982 12 19.3056C12 16.7129 17 11 17 11C17 11 22 16.7129 22 19.3056Z"
      stroke={color}
      strokeWidth="2.5"
    />
    <Path
      d="M17 2C8.71573 2 2 8.71573 2 17C2 25.2843 8.71573 32 17 32C25.2843 32 32 25.2843 32 17C32 13.8442 31.0255 10.916 29.3609 8.5"
      stroke={color}
      strokeWidth="2.5"
    />
  </Svg>
);

export const MenuLoginIcon = ({ color }) => (
  <View style={{ marginRight: 6 }}>
    <Svg
      width="40"
      height="32"
      viewBox="0 0 40 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M23.9349 0C20.8997 0 17.9457 0.854075 15.392 2.46984C12.9087 4.04109 10.9059 6.2605 9.60001 8.88802L12.0918 10.1265C14.3431 5.59657 18.8812 2.78261 23.9349 2.78261C31.223 2.78261 37.1523 8.71188 37.1523 16C37.1523 23.2881 31.223 29.2174 23.9349 29.2174C18.8812 29.2174 14.3431 26.4034 12.0918 21.8735L9.60001 23.112C10.9059 25.7396 12.9087 27.9589 15.392 29.5302C17.9457 31.1459 20.8997 32 23.9349 32C32.7573 32 39.9349 24.8224 39.9349 16C39.9349 7.17755 32.7573 0 23.9349 0Z"
        fill={color}
      />
      <Path
        d="M21.0452 20.7305L23.0127 22.698L29.5618 16.149L23.0127 9.60001L21.0452 11.5675L24.2353 14.7577H0V17.5403H24.2353L21.0452 20.7305Z"
        fill={color}
      />
    </Svg>
  </View>
);

export const MenuProductsIcon = ({ color }) => (
  <Svg
    width="30"
    height="38"
    viewBox="0 0 30 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M28 14H2C2.52209 19.6019 3.3057 30.8084 3.56627 32.3333C3.93173 34.4722 5.13253 36 7.63856 36H21.4217C24.5542 36 25.8072 34.7778 26.1205 32.3333L28 14Z"
      stroke={color}
      strokeWidth="2.5"
    />
    <Path
      d="M14 13.8444L11.4062 8.63735V2.52002C11.4062 2.23283 11.1693 2 10.8771 2H7.70309C7.41092 2 7.17405 2.23283 7.17405 2.52002V8.63735L4.0555 14.7676C4.01883 14.8397 4 14.9192 4 15"
      stroke={color}
      strokeWidth="2.5"
    />
    <Path
      d="M9 18V25C9 28.3137 11.6863 31 15 31V31C18.3137 31 21 28.3137 21 25V18"
      stroke={color}
      strokeWidth="2.5"
    />
    <Path d="M6 18H12" stroke={color} strokeWidth="2.5" />
    <Path d="M18 18H24" stroke={color} strokeWidth="2.5" />
    <Path
      d="M17 14V12.6C17 11.1001 17 10.3502 17.382 9.82443C17.5053 9.65464 17.6546 9.50533 17.8244 9.38197C18.3502 9 19.1001 9 20.6 9H21.4C22.8999 9 23.6498 9 24.1756 9.38197C24.3454 9.50533 24.4947 9.65464 24.618 9.82443C25 10.3502 25 11.1001 25 12.6V14"
      stroke={color}
      strokeWidth="2.5"
    />
  </Svg>
);

export const MenuWaterIcon = ({ color }) => (
  <Svg
    width="26"
    height="34"
    viewBox="0 0 26 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M24 21.1667C24 27.1498 19.0751 32 13 32C6.92487 32 2 27.1498 2 21.1667C2 12.5 13 2 13 2C13 2 24 12.5 24 21.1667Z"
      stroke={color}
      strokeWidth="2.5"
    />
    <Path
      d="M19 20C19 23.3137 16.3137 26 13 26"
      stroke={color}
      strokeWidth="2.5"
    />
  </Svg>
);

export const OrderAddress = () => (
  <Svg
    width="14"
    height="16"
    viewBox="0 0 14 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M6.99999 0C3.09999 0 -6.10352e-06 3.1 -6.10352e-06 7C-6.10352e-06 11 4.50001 14.1 6.30001 15.7C6.70001 16.1 7.30002 16.1 7.70002 15.7C9.50002 14 14 11 14 7C14 3.1 10.9 0 6.99999 0ZM7 10C5.3 10 4 8.7 4 7C4 5.3 5.3 4 7 4C8.7 4 10 5.3 10 7C10 8.6 8.7 10 7 10Z"
      fill="#0E2B45"
    />
  </Svg>
);
