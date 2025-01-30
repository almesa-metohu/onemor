import { IRoutine } from "@/services";
import { getAuthenticatedUrl } from "@/services/apiService";
import { FC } from "react";
import { Dimensions } from "react-native";
import { Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { View, Text, XStack, Image, YStack } from "tamagui";

interface WorkoutCardHeaderProps {
  profile_photo_url: string;
  name: string;
  routines: IRoutine[];
  activeRoutineIndex: number;
  id: string;
}

export const WorkoutCardHeader: FC<WorkoutCardHeaderProps> = ({
  activeRoutineIndex,
  name,
  profile_photo_url,
  routines,
  id,
}) => {
  const { width } = Dimensions.get("window");
  const scrollX = useSharedValue(0);
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
  return (
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

      <XStack m="$2" gap={10} width={width * 0.8}>
        <Image
          key={id}
          source={getAuthenticatedUrl(profile_photo_url)}
          width={50}
          height={50}
          borderRadius={8}
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
          <Text color="white" fontWeight={"$16"}>
            {routines[activeRoutineIndex]?.name}
          </Text>
        </YStack>
      </XStack>
    </View>
  );
};
