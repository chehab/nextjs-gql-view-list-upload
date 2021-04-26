import gql from 'graphql-tag'

import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

const myVidesList = gql`
  query viewer($offset: String, $limit: Int) {
    draftVideos: viewer {
      videos(publishStatus: DRAFT, after: $offset, first: $limit) {
        nodes {
          id
          url
          title
          imageUrl
          description
          defaultThumbnails
          uploadInfo {
            status
            errors
          }
        }
      }
    }

    publishedVideos: viewer {
      videos(publishStatus: PUBLISHED, after: $offset, first: $limit) {
        nodes {
          id
          url
          title
          imageUrl
          description
          defaultThumbnails
          uploadInfo {
            status
            errors
          }
        }
      }
    }
  }
`

function updateQuery(prev, { fetchMoreResult }) {
  if (!fetchMoreResult) return prev

  if (!prev) return fetchMoreResult

  debugger


  return {
    draftVideos: {
      videos: {
        nodes: [
          // ...(prev?.draftVideos.videos.nodes ?? []),
          // ...(fetchMoreResult?.draftVideos.videos.nodes ?? []),
        ],
      },
    },
    publishedVideos: {
      videos: {
        nodes: [
          // ...(prev?.publishedVideos.videos.nodes ?? []),
          // ...(fetchMoreResult?.publishedVideos.videos.nodes ?? []),
        ],
      },
    },
  }
}

export default function useMyVideosList(pageSize) {
  const fetchMoreRef = React.useRef()
  const [offset, setOffset] = React.useState(0)
  const [limit, setLimit] = React.useState(pageSize ?? 2)

  const { fetchMore, data, error, loading } = useQuery(myVidesList, {
    // updateQuery,
    variables: {
      offset: `${offset}`,
      limit: limit,
    },
  })

  React.useDebugValue({
    myVidesGQL: { data, error, loading },
  })

  React.useEffect(() => {
    fetchMoreRef.current = { fetchMore, offset, setOffset }
  }, [fetchMore, offset])

  function loadMore() {
    fetchMoreRef?.current?.fetchMore?.({
      // updateQuery,
      variables: {
        limit,
        offset: `${fetchMoreRef?.current?.offset}`,
      },
    })

    fetchMoreRef?.current?.setOffset((s) => s + limit)
  }

  return {
    loadMore: () => null,
    loading,
    error,
    data: {
      draftVideos: data?.draftVideos?.videos?.nodes ?? [],
      publishedVideos: data?.publishedVideos?.videos?.nodes ?? [],
    },
  }
}
