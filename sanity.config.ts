import {defineConfig} from 'sanity'
import {
  dashboardTool,
  projectInfoWidget,
  projectUsersWidget,
  sanityTutorialsWidget,
} from './src/index'

export default defineConfig({
  projectId: 'ppsg7ml5',
  dataset: 'test',
  plugins: [
    dashboardTool({
      widgets: [sanityTutorialsWidget(), projectUsersWidget(), projectInfoWidget()],
    }),
  ],
  scheduledPublishing: {
    enabled: false,
  },
  tasks: {
    enabled: false,
  },
})
