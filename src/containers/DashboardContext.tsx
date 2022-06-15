import {createContext, useContext} from 'react'
import {DashboardConfig} from '../types'

export const DashboardContext = createContext<DashboardConfig>({widgets: []})

export function useDashboardConfig(): DashboardConfig {
  return useContext(DashboardContext)
}
