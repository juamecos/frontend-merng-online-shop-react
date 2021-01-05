import React, { Suspense } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import routes from "./routes"
import { map } from "lodash"
import { start } from "../utils/token"
import { login } from "../redux/actions/authActions"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import RouteGuard from "./RouteGuard"

const Navigation = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const session = start()
    if (session !== null) {
      dispatch(login(session))
    }
  }, [])
  useEffect(() => {
    const session = start()
    if (session !== null) {
      dispatch(login(session))
    }
  }, [dispatch])

  return (
    <Router>
      <Suspense fallback={<span>Loading...</span>}>
        <Switch>
          {map(routes, (route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={props => (
                  <route.layout>
                    <RouteGuard
                      allowedRoles={route.allowedRoles}
                      render={guardProps => (
                        <route.component {...guardProps} {...props} />
                      )}
                    />
                  </route.layout>
                )}
              />
            )
          })}
        </Switch>
      </Suspense>
    </Router>
  )
}

export default Navigation
