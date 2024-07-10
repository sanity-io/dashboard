import React, {createElement, useMemo} from 'react'
import {useDashboardConfig} from './DashboardContext'
import {Card} from '@sanity/ui'
import {DashboardWidget} from '../types'

export function WidgetContainer(props: DashboardWidget) {
  const config = useDashboardConfig()
  const layout = useMemo(
    () => ({
      ...(props.layout || {}),
      ...(config.layout || {}),
    }),
    [props.layout, config.layout],
  )

  return (
    <Card shadow={1} data-width={layout.width} data-height={layout.height}>
      {createElement(props.component, {})}
    </Card>
  )
}
