import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'


const link = new HttpLink({
    uri: 'https://sourcing-api.snipfeed.app/graphql',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjMxNzE5MTEsInVzZXIiOnsiaWQiOiI2MDcwODk0NzI4YWQ5OGFkOGU3ZGM0YWQifSwiaWF0IjoxNjE3OTg3OTExfQ.u3NT8vOrjlC1KXxpKVdqVADn6euYaZI1epfgFzUC9V8'
    }
})

const cache = new InMemoryCache()

const client = new ApolloClient({
    link,
    cache
})

export default client