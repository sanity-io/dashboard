import {useMemo} from 'react'
import {useVersionedClient} from '../../versionedClient'
import imageUrlBuilder from '@sanity/image-url'

const tutorialsProjectConfig = {
  projectId: '3do82whm',
  dataset: 'next',
}

export interface Guide {
  _type?: string
  slug?: {current: string}
  presenter?: {
    name?: string
  }
}

export interface FeedItem {
  _id: string
  title?: string
  poster?: string
  category?: string
  guideOrTutorial?: Guide
  externalLink?: string
  presenter?: {
    name?: string
  }
  hasVideo?: boolean
}

export function useDataAdapter() {
  const versionedClient = useVersionedClient()
  return useMemo(
    () => ({
      getFeed: (templateRepoId: string) => {
        const uri = templateRepoId
          ? `/addons/dashboard?templateRepoId=${templateRepoId}`
          : '/addons/dashboard'
        return versionedClient.observable.request<{items: FeedItem[]}>({
          uri,
          tag: 'dashboard.sanity-tutorials',
          withCredentials: false,
        })
      },
      urlBuilder: imageUrlBuilder(tutorialsProjectConfig),
    }),
    [versionedClient],
  )
}
