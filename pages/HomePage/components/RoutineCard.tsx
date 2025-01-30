import { IRoutine } from "@/services";
import { getAuthenticatedUrl } from "@/services/apiService";
import { ResizeMode, Video } from "expo-av";
import { FC, useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { Spinner, View } from "tamagui";

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
        {
          shouldPlay: true,
        },
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
    <View width={width} backgroundColor="black" aspectRatio={3/4}>
        <Video
          key={routine.id}
          // ref={videoRef}
          source={{ uri: routine?.video?.playlist_url }}
          resizeMode={ResizeMode.COVER}
          style={{
            width: "100%",
            aspectRatio: 3 / 4,
            backgroundColor: "black",
          }}
          shouldPlay={isVisible}
          isLooping
          usePoster
          posterSource={getAuthenticatedUrl(routine?.video?.thumbnail_url)}
          posterStyle={{
            resizeMode: "cover",
          }}
        />
    </View>
  );
};
