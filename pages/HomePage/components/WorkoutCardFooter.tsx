import { getDifficultyLabel } from "@/services";
import moment from "moment";
import { Clock } from "phosphor-react-native";
import { FC } from "react";
import { Dimensions } from "react-native";
import { View, Text, XStack } from "tamagui";

interface WorkoutCardFooterProps {
  total_duration: number;
  difficulty: number;
}

export const WorkoutCardFooter: FC<WorkoutCardFooterProps> = ({
  difficulty,
  total_duration,
}) => {
  const { width } = Dimensions.get("window");

  return (
    <View m={"$4"} position="absolute" bottom={0} left={0} right={0} zIndex={2}>
      <XStack gap={8} width={width * 0.8}>
        <Clock size={18} color="white" weight="bold" />
        <Text color={"white"} fontSize="$4" fontWeight="bold">
          {moment.utc(total_duration * 1000).format("mm:ss")}
        </Text>
        <Text ml={"$3"} color={"white"} fontSize="$4" fontWeight="bold">
          {getDifficultyLabel(difficulty)}
        </Text>
      </XStack>
    </View>
  );
};
