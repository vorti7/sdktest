import React,{
  useState
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
// import { useQuery } from 'react-apollo-hooks'

// import Amplify, { API, graphqlOperation } from "aws-amplify";
// import * as mutations from './src/graphql/mutations';
import * as queries from './src/graphql/queries';

// const getList = () => {
//   const query = useQuery(gql(queries.listTodos), {
//     fetchPolicy: 'cache-and-network',
//   });
//   return query;
// };

// const listTodos = gql(queries.listTodos)

// export default (props) => {
const App = () => {

  const [ inputText, setInputText ] = useState("")
  // const newTodo = await API.graphql(graphqlOperation(mutations.createTodo, {input: {name:'I', description:"inputText"}}))
  // console.log(newTodo)
  const [ listTodo, setListTodo ] = useState([])
  // console.log(getList())
  // API.graphql(graphqlOperation(queries.listTodos)).then(response =>setListTodo(response.data.listTodos.items))
  btnPressed=()=>{
    // console.log('sgasg')
    // API.graphql(graphqlOperation(mutations.createTodo, {input: {name:'fromApp', description:inputText}}))
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
    todos: props.data.listTodos ? props.data.listTodos.items : []
  })
})(App)