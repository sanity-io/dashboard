import React, {CSSProperties} from 'react'
import {Dashboard} from './containers/Dashboard'
import {definePlugin} from 'sanity'
import {DashboardConfig, DashboardWidget, LayoutConfig} from './types'

const strokeStyle: CSSProperties = {
  stroke: 'currentColor',
  strokeWidth: 1.2,
}

const DashboardIcon = () => (
  <svg
    data-sanity-icon
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    width="1em"
    height="1em"
  >
    <path d="M19.5 19.5H5.5V5.5H19.5V19.5Z" style={strokeStyle} />
    <path d="M5.5 12.5H19.5" style={strokeStyle} />
    <path d="M14.5 19.5V12.5M10.5 12.5V5.5" style={strokeStyle} />
  </svg>
)

export interface DashboardPluginConfig {
  title?: string
  widgets?: DashboardWidget[]

  /**
   * Will be used for widgets that do not define a layout directly.
   */
  defaultLayout?: LayoutConfig
}

export const dashboardTool = definePlugin<DashboardPluginConfig>((config = {}) => {
  const pluginConfig: DashboardConfig = {
    layout: config.defaultLayout ?? {},
    widgets: config.widgets ?? [],
  }
  
  const title = config.title ?? 'Dashboard'

  return {
    name: 'dashboard',
    tools: (prev, context) => {
      return [
        ...prev,
        {
          title,
          name: 'dashboard',
          icon: DashboardIcon,
          component: () => <Dashboard config={pluginConfig} />,
        },
      ]
    },
  }
})
