import { IWorkout } from "@/services";
import { fetchWorkoutFeed } from "@/services/apiService";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spinner, View } from "tamagui";
import { WorkoutCard } from "./components";

export const HomePageScreen = () => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadWorkoutData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetchWorkoutFeed(page);
      setWorkouts((prev) => [...prev, ...response.data]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching workout feed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkoutData();
  }, []);

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, paddingHorizontal: 16, paddingTop: 12 }}
    >
      <FlashList
        data={workouts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <WorkoutCard workout={item} />}
        onEndReached={loadWorkoutData}
        onEndReachedThreshold={0.5}
        decelerationRate="fast"
        ItemSeparatorComponent={() => <View height={16} />}
        ListFooterComponent={loading ? <Spinner color={"#c3fb33"} mt={'$6'} /> : null}
      />
    </SafeAreaView>
  );
};
