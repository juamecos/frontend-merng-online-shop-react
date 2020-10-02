import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import routes from "./routes";
import { map } from "lodash";

const Navigation = () => {
  return (
    <Router>
      <Suspense fallback={<span>Loading...</span>}>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="active-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/contact" activeClassName="active-link">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/admin" activeClassName="active-link">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/admin/users" activeClassName="active-link">
              Users
            </NavLink>
          </li>
        </ul>

        <Switch>
          {map(routes, (route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={props => <route.component {...props} />}
            />
          ))}
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Navigation;
