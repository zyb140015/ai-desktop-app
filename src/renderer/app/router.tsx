import { createHashRouter } from 'react-router-dom'

import { Shell } from './shell'
import { NotFoundPage } from '../pages/not-found-page'
import { OverviewPage } from '../pages/overview-page'
import { PlaybookPage } from '../pages/playbook-page'
import { MonitorPage } from '../pages/monitor-page'
import { SettingsPage } from '../pages/settings-page'
import { SysconfigPage } from '../pages/sysconfig-page'

export const appRouter = createHashRouter([
  {
    path: '/',
    element: <Shell />,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: 'projects',
        element: <PlaybookPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'monitor',
        element: <MonitorPage />,
      },
      {
        path: 'sysconfig',
        element: <SysconfigPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
