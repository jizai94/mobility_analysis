
export const createRoutes = store => ({
  path: '/',
  component: require('CORE/CoreLayout').default,

  indexRoute: {
    onEnter: (nextState, replace) => {
      replace(`/login?time=${Date.now()}`)
    }
  },

  childRoutes: [
    require('./main').default(store),
    require('./login').default(store), 
    require('./applist').default(store),
    { 
      path: 'redirect', 
      component: require('VIEW/Redirect').default 
    }, { 
      path: '*', 
      component: require('VIEW/NoFound').default 
    }
  ]

})

export default createRoutes
