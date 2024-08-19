import './App.css';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware tat will attach the JWT
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization:token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // set up client to executie the 'authLink' middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Outlet />
    </ApolloProvider>
  )
}
export default App
