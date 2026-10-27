import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const News = React.lazy(() => import('./views/pages/news/News'))
const UpdateNews = React.lazy(() => import('./views/pages/news/UpdateNews'))
const PublishedNews = React.lazy(() => import('./views/pages/news/PublishedNews'))
const DraftNews = React.lazy(() => import('./views/pages/news/DraftNews'))
const ScheduleNews = React.lazy(() => import('./views/pages/news/ScheduleNews'))
const DeletedNews = React.lazy(() => import('./views/pages/news/DeletedNews'))
const ChangePassword = React.lazy(() => import('./views/pages/changePassword/ChangePassword'))
const Advertisement = React.lazy(() => import('./views/pages/advertisement/Advertisement'))
const Shorts = React.lazy(() => import('./views/pages/shorts/Shorts'))
const Users = React.lazy(() => import('./views/pages/users/Users'))
const Profile = React.lazy(() => import('./views/pages/users/Profile'))
const Category = React.lazy(() => import('./views/pages/category/Category'))
const SiteSetting = React.lazy(() => import('./views/pages/siteSetting/SiteSetting'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/news', name: 'News', element: News },
  { path: '/UpdateNews/:id', name: 'Update News', element: UpdateNews },
  { path: '/PublishedNews', name: 'Published News', element: PublishedNews },
  { path: '/DraftNews', name: 'Draft News', element: DraftNews },
  { path: '/ScheduleNews', name: 'Scheduled News', element: ScheduleNews },
  { path: '/DeletedNews', name: 'Deleted News', element: DeletedNews },
  { path: '/advertisement', name: 'Advertisement', element: Advertisement },
  { path: '/ChangePassword', name: 'Change Password', element: ChangePassword },
  { path: '/Users', name: 'Users', element: Users },
  { path: '/Profile', name: 'Profile', element: Profile },
  { path: '/shorts', name: 'Shorts', element: Shorts },
  { path: '/siteSetting', name: 'Site Setting', element: SiteSetting },
  { path: '/Category', name: 'Category', element: Category },
]
export default routes
