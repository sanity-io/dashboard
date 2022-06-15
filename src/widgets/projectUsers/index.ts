import {ProjectUsers} from './ProjectUsers'
import {LayoutConfig, DashboardWidget} from '../../types'

export function projectUsersWidget(config?: {layout?: LayoutConfig}): DashboardWidget {
  return {
    name: 'project-info',
    component: ProjectUsers,
    layout: config?.layout,
  }
}
