import {type DashboardWidget} from '../../types'

export interface ProjectInfoProps {
  __experimental_before?: DashboardWidget[]
  data: ProjectData[]
}

export interface App {
  title: string
  rows?: App[]
  value?: string | {error: string}
}

export interface ProjectData {
  title: string
  category?: string
}

export interface UserApplication {
  id: string
  projectId: string
  title: string | null
  type: string
  urlType: 'internal' | 'external'
  appHost: string

  // … there are other props here, but we don't really care about them for our use case
}
