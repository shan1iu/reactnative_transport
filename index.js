import {AppRegistry} from 'react-native';
import App from './app/App';

console.disableYellowBox = true;
console.ignoredYellowBox = ['Remote debugger'];

AppRegistry.registerComponent('TFGMProject', () => App);
