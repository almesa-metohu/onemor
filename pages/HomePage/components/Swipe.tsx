import { FC, ReactNode } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";

interface SwipeProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export const Swipe: FC<SwipeProps> = ({
  children,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGesture = (event: any) => {
    const { translationX, translationY } = event;

    translateX.value = translationX;
    translateY.value = translationY;

    if (translationX > 0) {
      onSwipeRight?.();
    } else {
      onSwipeLeft?.();
    }

    if (translationY > 0) {
      onSwipeDown?.();
    } else {
      onSwipeUp?.();
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <PanGestureHandler onGestureEvent={onGesture}>
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};
