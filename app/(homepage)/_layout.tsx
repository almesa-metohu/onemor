import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

const Router = () => {
  const colorScheme = useColorScheme();
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : 'transparent',
        },
      }}
    >
      <Stack.Screen
        name="home-page"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : 'transparent',
          },
        }}
      />
    </Stack>
  );
};

const Layout = () => {
  return <Router />;
};

export default Layout;