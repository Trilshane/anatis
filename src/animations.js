import { Animated } from "react-native";

export const AnimationFadeIn = (anim, delay) => {
  Animated.timing(anim, {
    toValue: 1,
    duration: delay,
    useNativeDriver: true,
  }).start();
};

export const AnimationFadeOut = (anim, delay) => {
  Animated.timing(anim, {
    toValue: 0,
    duration: delay,
    useNativeDriver: true,
  }).start();
};

// Это какая-то уже ненужная анимация, но я долго с ней страдал, жалко удалять
export const stackNavigatorCardSlide = ({
  current,
  next,
  inverted,
  layouts: { screen },
}) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: "clamp",
        })
      : 0
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -1, // Fully unfocused
              ],
              extrapolate: "clamp",
            }),
            inverted
          ),
        },
      ],
    },
  };
};
