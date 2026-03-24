import { createHashRouter } from 'react-router-dom'

import { Shell } from './shell'
import { NotFoundPage } from '../pages/not-found-page'
import { OverviewPage } from '../pages/overview-page'
import { PlaybookPage } from '../pages/playbook-page'
import { MonitorPage } from '../pages/monitor-page'
import { OperationLogsPage } from '../pages/operation-logs-page'
import { DictPage } from '../pages/dict-page'
import { MenusPage } from '../pages/menus-page'
import { UsersPage } from '../pages/users-page'
import { OrgsPage } from '../pages/orgs-page'
import { MenuTemplatePage } from '../pages/menu-template-page'
import { RolesPage } from '../pages/roles-page'
import { TenantPage } from '../pages/tenant-page'
import { ProfilePage } from '../pages/profile-page'
import { UsageStatsPage } from '../pages/usage-stats-page'
import { SystemStatsPage } from '../pages/system-stats-page'
import { LoginLogsPage } from '../pages/login-logs-page'
import { AnnouncementsPage } from '../pages/announcements-page'
import { SettingsPage } from '../pages/settings-page'
import { SysconfigPage } from '../pages/sysconfig-page'
import { MessagesPage } from '../pages/messages-page'

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
        path: 'bi/system',
        element: <SystemStatsPage />,
      },
      {
        path: 'bi/usage',
        element: <UsageStatsPage />,
      },
      {
        path: 'orgs',
        element: <OrgsPage />,
      },
      {
        path: 'roles',
        element: <RolesPage />,
      },
      {
        path: 'tenant/menu-template',
        element: <MenuTemplatePage />,
      },
      {
        path: 'tenant/management',
        element: <TenantPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'menus',
        element: <MenusPage />,
      },
      {
        path: 'dict',
        element: <DictPage />,
      },
      {
        path: 'announcements',
        element: <AnnouncementsPage />,
      },
      {
        path: 'logs/login',
        element: <LoginLogsPage />,
      },
      {
        path: 'logs/operation',
        element: <OperationLogsPage />,
      },
      {
        path: 'monitor',
        element: <MonitorPage />,
      },
      {
        path: 'messages',
        element: <MessagesPage />,
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
