import React from 'react'
import {DashboardLayout} from '../components/DashboardLayout'
import {WidgetGroup} from '../components/WidgetGroup'
import {DashboardContext} from './DashboardContext'
import {DashboardConfig} from '../types'

export function Dashboard({config}: {config: DashboardConfig}) {
  if (!config) {
    return null
  }

  return (
    <DashboardContext.Provider value={config}>
      <DashboardLayout>
        <WidgetGroup config={config} />
      </DashboardLayout>
    </DashboardContext.Provider>
  )
}
