import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Template from '../containers/Template'
import VideoPoker from '../containers/VideoPoker'

const createRoutes = () => {
  return (
    <Route
      path='/'
      component={Template}
    >
      <IndexRoute
        component={VideoPoker}
      />
    </Route>
  )
}

const routes = createRoutes()

export default routes
