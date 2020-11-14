export let appFunctionsToAssignToRoles = [
  {
    id: 'auth',
    name: 'Auth',
    children: [
      {
        id: 'auth.start_adding_user',
        name: 'Begin adding a new user to an existing account'
      },
      {
        id: 'auth.registrations.post',
        name: 'Create a registration'
      },
      {
        id: 'auth.registrations.get',
        name: 'Get all registrations'
      },
      {
        id: 'auth.registrations.id.get',
        name: 'Get registration by ID'
      },
      {
        id: 'auth.registrations.id.post',
        name: 'Update registration'
      },
      {
        id: 'auth.registrations.id.delete',
        name: 'Delete registration'
      }
    ]
  },
  {
    id: 'admin',
    name: 'Admin',
    children: [
      {
        id: 'admin.users',
        name: 'Users',
        children: [
          {
            id: 'admin.users.post',
            name: 'Create user'
          },
          {
            id: 'admin.users.id.get',
            name: 'Get user by ID'
          },
          {
            id: 'admin.users.id.direct_reports.get',
            name: "Get user's direct subordinates"
          },
          {
            id: 'admin.users.get',
            name: 'Get all users'
          },
          {
            id: 'admin.users.id.post',
            name: 'Update user'
          },
          {
            id: 'admin.users.id.delete',
            name: 'Delete user'
          }
        ]
      },
      {
        id: 'admin.roles',
        name: 'Roles',
        children: [
          {
            id: 'admin.roles.post',
            name: 'Create role'
          },
          {
            id: 'admin.roles.id.get',
            name: 'Get role by ID'
          },
          {
            id: 'admin.roles.get',
            name: 'Get all roles'
          },
          {
            id: 'admin.roles.id.post',
            name: 'Update role'
          },
          {
            id: 'admin.roles.id.delete',
            name: 'Delete role'
          }
        ]
      },
      {
        id: 'admin.businessRules',
        name: 'BusinessRules',
        children: [
          {
            id: 'admin.businessRules.post',
            name: 'Create business rule'
          },
          {
            id: 'admin.businessRules.id.get',
            name: 'Get business rule by ID'
          },
          {
            id: 'admin.businessRules.get',
            name: 'Get all business rules'
          },
          {
            id: 'admin.businessRules.id.post',
            name: 'Update business rule'
          },
          {
            id: 'admin.businessRules.id.delete',
            name: 'Delete business rule'
          }
        ]
      },
      {
        id: 'admin.generalSettings',
        name: 'GeneralSettings',
        children: [
          {
            id: 'admin.generalSettings.post',
            name: 'Create general setting'
          },
          {
            id: 'admin.generalSettings.id.get',
            name: 'Get general setting by ID'
          },
          {
            id: 'admin.generalSettings.get',
            name: 'Get all general settings'
          },
          {
            id: 'admin.generalSettings.id.post',
            name: 'Update general setting'
          },
          {
            id: 'admin.generalSettings.id.delete',
            name: 'Delete general setting'
          }
        ]
      },
      {
        id: 'admin.accounts',
        name: 'Accounts',
        children: [
          {
            id: 'admin.accounts.post',
            name: 'Create account'
          },
          {
            id: 'admin.accounts.id.get',
            name: 'Get account by ID'
          },
          {
            id: 'admin.accounts.get',
            name: 'Get accounts'
          },
          {
            id: 'admin.accounts.id.post',
            name: 'Update account'
          },
          {
            id: 'admin.accounts.id.delete',
            name: 'Delete account'
          }
        ]
      },
      {
        id: 'admin.licenses',
        name: 'Licenses',
        children: [
          {
            id: 'admin.licenses.post',
            name: 'Create license'
          },
          {
            id: 'admin.licenses.id.get',
            name: 'Get license by ID'
          },
          {
            id: 'admin.licenses.get',
            name: 'Get licenses'
          },
          {
            id: 'admin.licenses.id.post',
            name: 'Update license'
          },
          {
            id: 'admin.licenses.id.delete',
            name: 'Delete license'
          }
        ]
      },
      {
        id: 'admin.notifications',
        name: 'Notifications',
        children: [
          {
            id: 'admin.notifications.post',
            name: 'Create Notification'
          },
          {
            id: 'admin.notifications.id.get',
            name: 'Get notification by ID'
          },
          {
            id: 'admin.notifications.get',
            name: 'Get notifications'
          },
          {
            id: 'admin.notifications.id.post',
            name: 'Update notification'
          },
          {
            id: 'admin.notifications.id.delete',
            name: 'Delete notification'
          }
        ]
      },
      {
        id: 'admin.security',
        name: 'Security',
        children: [
          {
            id: 'admin.security.post',
            name: 'Create security'
          },
          {
            id: 'admin.security.id.get',
            name: 'Get security by ID'
          },
          {
            id: 'admin.security.get',
            name: 'Get security'
          },
          {
            id: 'admin.security.id.post',
            name: 'Update security'
          },
          {
            id: 'admin.security.id.delete',
            name: 'Delete security'
          }
        ]
      },
      {
        id: 'admin.help',
        name: 'Help',
        children: [
          {
            id: 'admin.help.post',
            name: 'Create help'
          },
          {
            id: 'admin.help.id.get',
            name: 'Get help by ID'
          },
          {
            id: 'admin.help.get',
            name: 'Get help'
          },
          {
            id: 'admin.help.id.post',
            name: 'Update help'
          },
          {
            id: 'admin.help.id.delete',
            name: 'Delete help'
          }
        ]
      }
    ]
  },
  {
    id: 'datasystem',
    name: 'DataSystem',
    children: [
      {
        id: 'datasystem.connections',
        name: 'Connections',
        children: [
          {
            id: 'datasystem.connections.post',
            name: 'Create connection'
          },
          {
            id: 'datasystem.connections.id.get',
            name: 'Get connection by ID'
          },
          {
            id: 'datasystem.connections.id.entities.get',
            name: 'Get connection entities & fields'
          },
          {
            id: 'datasystem.connections.id.verify.post',
            name: 'Verify a connection can connect'
          },
          {
            id: 'datasystem.connections.get',
            name: 'Get all connections'
          },
          {
            id: 'datasystem.connections.id.post',
            name: 'Update connection'
          },
          {
            id: 'datasystem.connections.id.delete',
            name: 'Delete connection'
          }
        ]
      },
      {
        id: 'datasystem.crawlers',
        name: 'Crawlers',
        children: [
          {
            id: 'datasystem.crawlers.post',
            name: 'Create crawler'
          },
          {
            id: 'datasystem.crawlers.id.get',
            name: 'Get crawler by ID'
          },
          {
            id: 'datasystem.crawlers.id.signal.post',
            name: 'Send a signal to a crawler'
          },
          {
            id: 'datasystem.crawlers.get',
            name: 'Get all crawlers'
          },
          {
            id: 'datasystem.crawlers.id.post',
            name: 'Update crawler'
          },
          {
            id: 'datasystem.crawlers.id.delete',
            name: 'Delete crawler'
          },
          {
            id: 'datasystem.crawlers.id.lds.get',
            name: 'Get the local data store used by this crawler'
          }
        ]
      },
      {
        id: 'datasystem.estimators',
        name: 'Estimators',
        children: [
          {
            id: 'datasystem.estimators.id.get',
            name: 'Get estimator by ID'
          },
          {
            id: 'datasystem.estimators.id.post',
            name: 'Update estimator'
          }
        ]
      },
      {
        id: 'datasystem.lds',
        name: 'Local data store',
        children: [
          {
            id: 'datasystem.lds.id.get',
            name: 'Get a local data store by ID'
          },
          {
            id: 'datasystem.lds.id.post',
            name: 'Update a local data store'
          },
          {
            id: 'datasystem.lds.id.estimators.get',
            name: "Get a local data store's estimators."
          }
        ]
      }
    ]
  }
]
