import {useClient} from 'sanity'

export function useVersionedClient() {
  return useClient({apiVersion: '1'})
}
