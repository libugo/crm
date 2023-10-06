const business = [
  {
    name: 'business', path: '', component: () => import('pages/business/BusinessPage.vue'),
    meta: {
      title: "跟单预约"
    }
  },
  {
    name: 'bCustomer', path: 'customer', component: () => import('pages/business-customer/BCustomerPage.vue'),
    meta: {
      title: "客户跟单"
    }
  },
  {
    name: 'bRes', path: 'res', component: () => import('pages/business-res/BResPage.vue'),
    meta: {
      title: "中介跟单"
    }
  },
]

const customer = [
  {
    name: 'customer', path: '', component: () => import('pages/customer/CustomerPage.vue'),
    meta: {
      title: "客户"
    }
  },
  {
    name: 'addCustomer', path: 'add', component: () => import('pages/customer/AddCustomerPage.vue'),
    meta: {
      title: "客户登记"
    }
  },
]

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'home', path: '', component: () => import('pages/business/BusinessPage.vue'),
        meta: {
          title: "工作台"
        }
      },
      /*      {
              name: 'user', path: 'user', component: () => import('pages/user/UserPage.vue'),
              meta: {
                title: "人员"
              }
            },*/
      {path: 'customer', children: [...customer]},
      {
        name: 'res', path: 'res', component: () => import('pages/res/ResPage.vue'),
        meta: {
          title: "中介"
        }
      },
      {path: 'business', children: [...business]},
      {
        name: 'template', path: 'template', component: () => import('pages/template/templatePage.vue'),
        meta: {
          title: "话术"
        }
      },
      {
        name: 'system', path: 'system', component: () => import('pages/system/SystemSettingPage.vue'),
        meta: {
          title: "系统设置"
        }
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
