import { SafeAreaView } from "react-native-safe-area-context";

export const AppHeader = () => {
  return (
    <SafeAreaView
      edges={["left", "top", "right"]}
      style={{ backgroundColor: "white" }}
    ></SafeAreaView>
  );
};
