import { AppRegistry } from 'react-native';
import App from '../vivah/App'; // Adjust the path based on your project structure
import { name as appName } from '../vivah/app.json';

AppRegistry.registerComponent(appName, () => App);
