import { Stack } from "expo-router";

const Router = () => {
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#1E1E1E',
        },
      }}
    >
      <Stack.Screen
        name="home-page"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#1E1E1E',
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