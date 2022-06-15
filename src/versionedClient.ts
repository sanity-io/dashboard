import {useClient} from 'sanity'
import {useMemo} from 'react'

export function useVersionedClient() {
  const client = useClient()
  return useMemo(() => client.withConfig({apiVersion: '1'}), [client])
}
