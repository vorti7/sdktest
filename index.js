/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import awsconfig from './src/aws-exports'

AppRegistry.registerComponent(appName, () => App);
