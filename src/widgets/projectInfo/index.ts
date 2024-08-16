import {ProjectInfo} from './ProjectInfo'
import {type LayoutConfig, type DashboardWidget} from '../../types'

export function projectInfoWidget(config?: {layout?: LayoutConfig}): DashboardWidget {
  return {
    name: 'project-info',
    component: ProjectInfo,
    layout: config?.layout ?? {width: 'medium'},
  }
}
