import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import NotFound from '../views/error/NotFound'
import NetworkIssue from '../views/error/NetworkIssue'
import UnknownIssue from '../views/error/UnknownIssue'
import Leads from '../views/leads/CreateLead'
import SegmentationMapping from '../views/leads/SegmentationMapping'
import LeadSegmentation from '../views/leads/LeadSegmentation'
import SegmentationFilter from '../views/leads/SegmentationFilter'
import SignIn from '../views/auth/SignIn'
import SignUp from '../views/auth/SignUp'
import FinishAccountSignup from '../views/auth/FinishAccountSignup'
import FinishAddingUser from '../views/auth/FinishAddingUser'
import ForgotPassword from '../views/auth/ForgotPassword'
import Dashboard from '../views/Dashboard'
import Profile from '../views/Profile'
import CleanData from '../views/CleanData'
import License from '../views/admin/License'
import ManageUsers from '../views/admin/ManageUsers'
import Account from '../views/admin/Account'
import Roles from '../views/admin/Roles'
import Connections from '../views/admin/Connections'
import AdminDashboard from '../views/admin/dashboard/Dashboard'
import TeamPerformanceDashboard from '../views/admin/dashboard/TeamPerformanceDashboard'
import SystemPerformanceDashboard from '../views/admin/dashboard/SystemPerformanceDashboard'
import OnYourPlateDashboard from '../views/admin/dashboard/OnYourPlateDashboard'
import SalesRepDashboard from '../views/sales/dashboard/SalesRepDashboard'
import SalesManagerDashboard from '../views/sales/dashboard/SalesManagerDashboard'
import BusinessRules from '../views/businessRules'
import ManageBusinessRule from '../views/businessRules/ManageBusinessRule'
import GeneralSettings from '../views/generalSettings'
import Setup from '../views/generalSettings/Setup'
import SlackNotifications from '../views/generalSettings/Notifications'
import GeneralSettingsHome from '../views/generalSettings/Home'
import GovernanceRules from '../views/generalSettings/GovernanceRules'
import Notifications from '../views/notifications'
import Security from '../views/security'
import Help from '../views/help'
import MergeHistory from '@/views/MergeHistory'

Vue.use(VueRouter)

const router = new VueRouter({
  /*
      mode: history tells Vue to use the browser history.pushState API to change
      the URL without reloading the page.
    */
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/cleandata',
          name: 'Clean Data',
          component: CleanData,
          children: [
            {
              path: '/',
              name: 'User Management',
              component: ManageUsers
            },
            {
              path: 'users',
              name: 'User Management',
              component: ManageUsers
            },
            {
              path: 'roles',
              name: 'Permissions Rules',
              component: Roles
            },
            {
              path: 'business-rules',
              name: 'Business Rules',
              component: BusinessRules,
              meta: { requiresAuth: true }
            },
            {
              path: 'manage-business-rule',
              name: 'Manage Business Rules',
              component: ManageBusinessRule,
              meta: { requiresAuth: true }
            },
            {
              path: 'edit-business-rule/:id',
              name: 'Edit Business Rule',
              component: ManageBusinessRule,
              meta: { requiresAuth: true }
            },
            {
              path: 'general-settings',
              name: 'General Settings',
              component: GeneralSettings,
              meta: { requiresAuth: true },
              children: [
                {
                  path: '',
                  name: 'home',
                  component: GeneralSettingsHome
                },
                {
                  path: 'setup',
                  name: 'Setup',
                  component: Setup
                },
                {
                  path: 'governance-rules',
                  name: 'Governance Rules',
                  component: GovernanceRules
                },
                {
                  path: 'notifications',
                  name: 'Notification',
                  component: SlackNotifications
                }
              ]
            }
          ]
        },
        {
          path: 'account',
          name: 'adminAccount',
          component: Account
        },
        {
          path: 'connections',
          name: 'adminConnections',
          component: Connections
        },
        {
          path: 'license',
          name: 'adminLicense',
          component: License
        },
        {
          path: 'notifications',
          name: 'notifications',
          component: Notifications,
          meta: { requiresAuth: true }
        },
        {
          path: 'security',
          name: 'security',
          component: Security,
          meta: { requiresAuth: true }
        },
        {
          path: 'help',
          name: 'Help',
          component: Help
        },
        {
          path: 'profile',
          name: 'profile',
          component: Profile
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin-dashboard',
      name: 'adminDashboard',
      component: AdminDashboard,
      children: [
        {
          path: 'team-performance-dashboard',
          name: 'teamPerformanceDashboard',
          component: TeamPerformanceDashboard
        },
        {
          path: 'sys-performance-dashboard',
          name: 'systemPerformanceDashboard',
          component: SystemPerformanceDashboard
        },
        {
          path: 'on-plate-dashboard',
          name: 'onYourPlateDashboard',
          component: OnYourPlateDashboard
        }
      ]
    },
    {
      path: '/sales-rep-dashboard',
      name: 'salesRepDashboard',
      component: SalesRepDashboard
    },
    {
      path: '/sales-manager-dashboard',
      name: 'salesManagerDashboard',
      component: SalesManagerDashboard
    },

    //
    // Auth routes
    //
    {
      path: '/auth/sign_in',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/auth/start_account_signup',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/auth/finish_account_signup',
      name: 'finishAccountSignup',
      component: FinishAccountSignup
    },
    {
      path: '/auth/finish_adding_user',
      name: 'finishAddingUser',
      component: FinishAddingUser
    },
    {
      path: '/auth/forgot',
      name: 'forgotPassword',
      component: ForgotPassword
    },
    {
      path: '/mergeHistory',
      name: 'mergeHistory',
      component: MergeHistory
    },
    //
    // Error routes
    //
    /*
          The paths /404 and * are for routes that are not found. Not that '*'
          specifies that any route not explicitly defined gets redirected by the
          browser to the /404 route.
        */
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '/400',
      name: '400',
      component: UnknownIssue
    },
    {
      path: '*',
      redirect: { name: '404' }
    },
    /*
          Need to add the following routes:
            401 (not authorized)
            403 (invalid permissions)
            All other 4XX (bad request)
        */
    /*
          For when the customer can not access the netwok for any reason, this
          /networkissue route is to be accessed by the vue code. These are all
          error codes that are not excplicityly caught (2XX and 4XX). All else
          go here.
        */
    {
      path: '/networkissue',
      name: 'networkissue',
      component: NetworkIssue
    }
  ]
})
Vue.config.devtools = true
router.beforeEach((to, from, next) => {
  const jwt = localStorage.getItem('jwt')
  if (to.matched.some((record) => record.meta.requiresAuth) && !jwt) {
    next('/auth/sign_in')
  }
  next()
})

export default router
