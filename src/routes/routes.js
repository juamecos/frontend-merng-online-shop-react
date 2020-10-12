import { lazy } from "react";

// layouts
import LayoutAdmin from "../Layouts/LayoutAdmin/LayoutAdmin";
import LayoutPublic from "../Layouts/LayoutPublic/LayoutPublic";
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
    layout: LayoutPublic,
    exact: true,
  },
  {
    path: "/contact",
    component: Contact,
    layout: LayoutPublic,
    exact: true,
  },
  {
    path: "/admin",
    layout: LayoutAdmin,
    component: Dashboard,
    exact: true,
  },
  {
    path: "/admin/users",
    layout: LayoutAdmin,
    component: Users,
    exact: true,
  },
  {
    component: NoFoundPage,
  },
];

export default routes;
