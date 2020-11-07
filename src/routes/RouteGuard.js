import React from "react";
import { Redirect } from "react-router-dom";
import { getUserToken } from "../utils/token";
import userRoles from "../utils/roles";

function RouteGuard(props) {
  const userData = getUserToken();
  let userRole;
  userData ? (userRole = userData.role) : (userRole = userRoles.VIEWER);

  if (props.allowedRoles.indexOf(userRole) > -1) {
    return props.render({ userRole: userRole });
  }
  return <Redirect to="**" />;
}
export default RouteGuard;
