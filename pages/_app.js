import App from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'
import apolloClient from '../data/client'

export default function MyApp(props) {
  return (
    <ApolloProvider client={apolloClient}>
      <App {...props} />
    </ApolloProvider>
  )
}
