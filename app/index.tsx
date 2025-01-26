import * as NavigationBar from 'expo-navigation-bar';
import { Redirect } from 'expo-router';

export const App = () => {
  NavigationBar.setBackgroundColorAsync('#FFFFFF');

  return <Redirect href={'/(homepage)/home-page'} />;
};

export default App;
