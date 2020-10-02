import { lazy } from "react";
// layouts

// Pages

const Home = lazy(() => import("../pages/public/Home"));
const Contact = lazy(() => import("../pages/public/Contact"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Users = lazy(() => import("../pages/admin/Users"));
const NoFoundPage = lazy(() => import("../pages/NoFoundPage"));

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/contact",
    component: Contact,
    exact: true,
  },
  {
    path: "/admin",
    component: Dashboard,
    exact: true,
  },
  {
    path: "/admin/users",
    component: Users,
    exact: true,
  },
  {
    component: NoFoundPage,
  },
];

export default routes;
