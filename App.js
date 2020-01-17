import React,{
  useState,
  useEffect
} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
// import { useQuery } from '@apollo/react-hooks';
import { useQuery } from 'react-apollo-hooks'

// import { buildSubscription } from 'aws-appsync'

import * as mutations from './src/graphql/mutations';
import * as queries from './src/graphql/queries';
import * as subscriptions from './src/graphql/subscriptions'

const App = (props) => {
  console.log(props)
  const [ inputText, setInputText ] = useState("")
  const [ listTodo, setListTodo ] = useState(props.todos)

  useEffect(() => {
    props.subscribeToNewTodos()
    // props.data.subscribeToMore(
    //   buildSubscription(gql(subscriptions.onCreateTodo), gql(queries.listTodos))
    // )
  },[])
  const btnPressed=()=>{
  }

  return (
    <View
      style={{
        flex:1
      }}
    >
      <View
        style={{
          flex:1,
          flexDirection:'row',
          padding:5
        }}
      >
        <TextInput
          style={{
            flex:4,
            borderWidth:1
          }}
          onChangeText={text => setInputText(text)}
        />
        <TouchableOpacity
          style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
          }}
          onPress={() => btnPressed()}
        >
          <Text>put</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex:9
        }}
      >
        <FlatList
          data={listTodo}
          renderItem={({item}) => (
            <View
              style={{
                width:'100%',
                height:50,
                flexDirection:'row',
                borderBottomWidth:1
              }}
            >
              <View
                style={{
                  flex:1,
                  borderRightWidth:1,
                  justifyContent:'center',
                  alignItems:'center'
                }}
              >
                <Text>{item.name}</Text>
              </View>
              <View
                style={{
                  flex:5,
                  justifyContent:'center',
                  alignItems:'center'
                }}
              >
                <Text>{item.description}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default graphql(gql(queries.listTodos), {
  options: {
    fetchPolicy: 'cache-and-network'
  },
  props: props => ({
    todos: props.data.listTodos ? props.data.listTodos.items : [],
    subscribeToNewTodos: params => {
      props.data.subscribeToMore({
        document: gql(subscriptions.onCreateTodo),
        updateQuery: (prev, { subscriptionData: { data : { onCreateTodo } } }) => ({
          ...prev,
          listTodos: { __typename: 'TodoConnection', items: [onCreateTodo, ...prev.listTodos.items.filter(todo => todo.id !== onCreateTodo.id)] }
        })
      })
    }
  })
})(App)

// export default graphql(gql(queries.listTodos), {
//   options: {
//     fetchPolicy: 'cache-and-network'
//   },
//   props: props => ({
//     todos: props.data.listTodos ? props.data.listTodos.items : [],
//     data: props.data
//   })
// })(App)