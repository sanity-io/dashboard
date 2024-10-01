import {useClient} from 'sanity'

export function useVersionedClient() {
  return useClient({apiVersion: '2024-08-01'})
}
