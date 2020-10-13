import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes";
import { map } from "lodash";

const Navigation = () => {
  return (
    <Router>
      <Suspense fallback={<span>Loading...</span>}>
        <Switch>
          {map(routes, (route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={props => (
                <route.layout>
                  <route.component {...props} />
                </route.layout>
              )}
            />
          ))}
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Navigation;
