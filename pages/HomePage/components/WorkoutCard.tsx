import { getDifficultyLabel, IRoutine, IWorkout } from "@/services";
import { FlashList } from "@shopify/flash-list";
import moment from "moment";
import { Clock } from "phosphor-react-native";
import { FC, useCallback, useState } from "react";
import { Dimensions, NativeScrollEvent } from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { Text, View, XStack } from "tamagui";
import { RoutineCard } from "./RoutineCard";
import { WorkoutCardHeader } from "./WorkoutCardHeader";
import { WorkoutCardFooter } from "./WorkoutCardFooter";

interface WorkoutCardProps {
  workout: IWorkout;
}

export const WorkoutCard: FC<WorkoutCardProps> = ({
  workout: {
    user: { profile_photo_url, id },
    routines,
    name,
    total_duration,
    difficulty,
  },
}) => {
  const [activeRoutineIndex, setActiveRoutineIndex] = useState(0);
  const { width } = Dimensions.get("window");

  const scrollX = useSharedValue(0);

  const handleRoutineScroll = (event: { nativeEvent: NativeScrollEvent }) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    scrollX.value = withSpring(offsetX);
    setActiveRoutineIndex(Math.round(offsetX / width));
  };

  const renderRoutine = useCallback(
    ({ item, index }: { item: IRoutine, index: number }) => {
      return (
        <View width={width}>
          <RoutineCard
            key={item.id}
            routine={item}
            isVisible={activeRoutineIndex === index}
          />
        </View>
      );
    },
    [activeRoutineIndex, routines, width]
  );

  return (
    <View flex={1} aspectRatio={3 / 4} borderRadius={12} overflow="hidden">
      <WorkoutCardHeader
        activeRoutineIndex={activeRoutineIndex}
        name={name}
        profile_photo_url={profile_photo_url}
        routines={routines}
        id={id}
      />
      <FlashList
        data={routines}
        extraData={activeRoutineIndex}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderRoutine}
        snapToAlignment="start"
        snapToInterval={width}
        decelerationRate="fast"
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 300,
        }}
        onScroll={handleRoutineScroll}
        scrollEventThrottle={16}
        estimatedItemSize={width}
      />
      <WorkoutCardFooter
        total_duration={total_duration}
        difficulty={difficulty}
      />
    </View>
  );
};
