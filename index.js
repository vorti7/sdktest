/**
 * @format
 */
import React, { useState, useEffect } from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Amplify from 'aws-amplify'
import AWSAppSyncClient, { buildSubscription } from 'aws-appsync';
import { Rehydrated, graphqlMutation } from 'aws-appsync-react';
import { ApolloProvider, useApolloClient } from 'react-apollo';
// import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import {ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import AppSyncConfig from './src/aws-exports'

Amplify.configure(AppSyncConfig)

const client = new AWSAppSyncClient({
    url: AppSyncConfig.aws_appsync_graphqlEndpoint,
    region: AppSyncConfig.aws_appsync_region,
    auth: {
      type: AppSyncConfig.aws_appsync_authenticationType,
      apiKey: AppSyncConfig.aws_appsync_apiKey,
      // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
    }
  })
// const Rehydrated = ({ children }) => {
//     const client = useApolloClient();
//     const [rehydrated, setState] = useState(false);
  
//     useEffect(() => {
//       if (client instanceof AWSAppSyncClient) {
//         (async () => {
//           await client.hydrated();
//           setState(true);
//         })();
//       }
//     }, [client]);
  
//     return rehydrated ? children : null;
//   };
  
const WithProvider = () => (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <Rehydrated>
          <App {...this.props} />
        </Rehydrated>
      </ApolloHooksProvider>
    </ApolloProvider>
  )

AppRegistry.registerComponent(appName, () => WithProvider);
