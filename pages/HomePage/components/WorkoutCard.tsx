import { IRoutine, IWorkout } from "@/services";
import { FlashList, ViewToken } from "@shopify/flash-list";
import { FC, useCallback, useState } from "react";
import { Dimensions, NativeScrollEvent } from "react-native";
import {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";
import { Image, Text, View, XStack, YStack } from "tamagui";
import { RoutineCard } from "./RoutineCard";

interface WorkoutCardProps {
  workout: IWorkout;
}

export const WorkoutCard: FC<WorkoutCardProps> = ({
  workout: {
    user: { profile_photo_url },
    routines,
    description,
    name,
  },
}) => {
  const [activeRoutineIndex, setActiveRoutineIndex] = useState(0);
  const { width } = Dimensions.get("window");

  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    console.log('viewableItems', viewableItems);
    setVisibleItems(viewableItems.map((item) => item.item.id as string));
    console.log('visibleItems', visibleItems);
  };

  const scrollX = useSharedValue(0);

  const handleRoutineScroll = (event: { nativeEvent: NativeScrollEvent }) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    scrollX.value = withSpring(offsetX);
    setActiveRoutineIndex(Math.round(offsetX / width));
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            routines.map((_, i) => i * width * 0.8),
            routines.map((_, i) => i * 20),
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const renderRoutine = useCallback(
    ({ item }: { item: IRoutine }) => {
      console.log(visibleItems, item.id, visibleItems.includes(item.id.toString()));
      return (
        <View width={width}>
          <RoutineCard
            key={item.id}
            routine={item}
            isVisible={visibleItems.includes(item.id.toString())}
          />
        </View>
      );
    },
    [visibleItems]
  );

  return (
    <View flex={1} aspectRatio={9 / 16} borderRadius={12} overflow="hidden">
      <View position="absolute" top={0} left={0} right={0} zIndex={2}>
        <XStack gap="$2" width={width * 0.9} style={animatedStyle} m={6}>
          {routines.map((_, index) => (
            <View
              key={index}
              backgroundColor={
                index === activeRoutineIndex ? "white" : "$gray700"
              }
              flexGrow={1}
              height={2}
              borderRadius={1}
              style={{ opacity: 0.8 }}
            />
          ))}
        </XStack>

        <XStack mt="$4" width={width * 0.8}>
          <Image
            source={{ uri: profile_photo_url }}
            width={40}
            height={40}
            borderRadius={20}
            backgroundColor="$gray8"
          />
          <YStack gap="$1">
            <Text
              color="white"
              fontSize="$6"
              fontWeight="bold"
              textTransform="uppercase"
            >
              {name}
            </Text>
            <Text color="white">{routines[activeRoutineIndex]?.name}</Text>
          </YStack>
        </XStack>
      </View>
      <FlashList
        data={routines}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderRoutine}
        snapToAlignment="start"
        snapToInterval={width}
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        onScroll={handleRoutineScroll}
        scrollEventThrottle={16}
        estimatedItemSize={width}
      />
    </View>
  );
};
