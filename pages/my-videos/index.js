import React from 'react'
import Link from 'next/link'
import faker from 'faker'
import InfiniteLoader from 'react-window-infinite-loader'
import { FixedSizeList as List } from 'react-window'

import useMyVideosList from '../../data/query/myVideos'



const remoteRowCount = 100

const MyVideosCtx = React.createContext()

function useMyVideoCtx() {
  return React.useContext(MyVideosCtx)
}

function fetchMoreItems() {
  return Promise.resolve().then(() => {
    const fetchData = [...Array(10).keys()].map(() => ({
        videoId: faker.datatype.uuid(),
        title: faker.lorem.sentence(),
        thumb: faker.image.imageUrl(600, 400, 'unsplash', true),
      }))

    console.log({ fetchData })

    return fetchData
  })
}

function Row({ key, index, style }) {
  const { videosList } = useMyVideoCtx()

  console.log({ videCtx: videosList })

  let label
  const thisVideo = videosList[index]

  console.log({ index, key }, thisVideo)

  if (thisVideo) {
    label = index + ') ' + thisVideo.title
  } else {
    label = index + ') Loading...'
  }

  return (
    <div className="ListItem" style={style}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderBottom: '4px solid #cdcdcd',
        }}
      >
        <img width={100} src={thisVideo?.imageUrl} />
        <h3>{label}</h3>
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
          }}
        >
          <li>
            <button>🗑 Delete</button>
          </li>
          <li></li>
        </ul>
      </div>
    </div>
  )
}

export default function MyVideosList() {
  const myVideosState = React.useRef({})
  const [videosList, setVideosList] = React.useState([])
  
  const { loadMore: loadMoreItems, data: myvideoslist } = useMyVideosList(100)

  React.useEffect(() => {
    myVideosState.current = {
      videosList,
      setVideosList,
    }
  }, [videosList, setVideosList])

  function isItemLoaded(index) {
    return !!myVideosState?.current?.videosList?.[index] ?? false
  }

  const itemsCount = myvideoslist?.publishedVideos?.length + 1

  return (
    <div>
      <h1>My Videos</h1>
      <Link href="my-videos/add">[Add Video]</Link>
      <hr />
      <MyVideosCtx.Provider value={{ videosList: myvideoslist.publishedVideos, }}>
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemsCount}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              ref={ref}
              height={500}
              width="100vw"
              itemSize={200}
              className="List"
              itemCount={itemsCount}
              onItemsRendered={onItemsRendered}
            >
              {Row}
            </List>
          )}
        </InfiniteLoader>
      </MyVideosCtx.Provider>
    </div>
  )
}
