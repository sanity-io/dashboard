import {SanityTutorials} from './SanityTutorials'
import {LayoutConfig, DashboardWidget} from '../../types'

export function sanityTutorialsWidget(config?: {layout?: LayoutConfig}): DashboardWidget {
  return {
    name: 'sanity-tutorials',
    component: SanityTutorials,
    layout: config?.layout ?? {width: 'full'},
  }
}
