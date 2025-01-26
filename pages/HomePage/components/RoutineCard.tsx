import { IRoutine } from "@/services";
import { ResizeMode, Video } from "expo-av";
import { FC, useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { View } from "tamagui";
import { Image } from "expo-image";

interface RoutineCardProps {
  routine: IRoutine;
  isVisible: boolean;
}

export const RoutineCard: FC<RoutineCardProps> = ({ routine, isVisible }) => {
  const { width } = Dimensions.get("window");
  const videoRef = useRef<Video>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (isVisible && !isVideoLoaded) {
      videoRef.current?.loadAsync(
        { uri: routine.video.playlist_url },
        { shouldPlay: true },
        true
      );
      setIsVideoLoaded(true);
    }

    return () => {
      if (!isVisible) {
        videoRef.current?.unloadAsync();
        setIsVideoLoaded(false);
      }
    };
  }, [isVisible]);


  return (
    <View width={width} backgroundColor="black" aspectRatio={9 / 16}>
      {isVisible && (
        <Video
          key={routine.id}
          ref={videoRef}
          source={{ uri: routine.video.playlist_url }}
          resizeMode={ResizeMode.STRETCH}
          style={{
            width: "100%",
            aspectRatio: 9 / 16,
            backgroundColor: "black",
          }}
          shouldPlay={isVisible}
          isLooping
          posterSource={{ uri: routine.video.thumbnail_url }}
        />
      )}
    </View>
  );
};
