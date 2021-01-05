import { lazy } from "react"
import roles from "../utils/roles"

// layouts
import LayoutAdmin from "../Layouts/LayoutAdmin/LayoutAdmin"
import LayoutPublic from "../Layouts/LayoutPublic/LayoutPublic"
// Pages

const Home = lazy(() => import("../pages/public/Home"))
const Contact = lazy(() => import("../pages/public/Contact"))
const Login = lazy(() => import("../pages/public/Login"))
const Register = lazy(() => import("../pages/public/Register"))
const Dashboard = lazy(() => import("../pages/admin/Dashboard"))
const Users = lazy(() => import("../pages/admin/Users"))
const Genres = lazy(() => import("../pages/admin/Genres"))
const Tags = lazy(() => import("../pages/admin/Tags"))
const NoFoundPage = lazy(() => import("../pages/NoFoundPage"))

const { ADMIN, CLIENT, VIEWER } = roles

const routes = [
  {
    path: "/",
    component: Home,
    layout: LayoutPublic,
    allowedRoles: [ADMIN, CLIENT, VIEWER],
    exact: true,
  },
  {
    path: "/contact",
    component: Contact,
    layout: LayoutPublic,
    allowedRoles: [ADMIN, CLIENT, VIEWER],
    exact: true,
  },
  {
    path: "/login",
    component: Login,
    layout: LayoutPublic,
    allowedRoles: [ADMIN, CLIENT, VIEWER],
    exact: true,
  },
  {
    path: "/register",
    component: Register,
    layout: LayoutPublic,
    allowedRoles: [ADMIN, CLIENT, VIEWER],
    exact: true,
  },
  {
    path: "/admin",
    layout: LayoutAdmin,
    component: Dashboard,
    allowedRoles: [ADMIN],
    exact: true,
  },
  {
    path: "/admin/users",
    layout: LayoutAdmin,
    component: Users,
    allowedRoles: [ADMIN],
    exact: true,
  },
  {
    path: "/admin/genres",
    layout: LayoutAdmin,
    component: Genres,
    allowedRoles: [ADMIN],
    exact: true,
  },
  {
    path: "/admin/tags",
    layout: LayoutAdmin,
    component: Tags,
    allowedRoles: [ADMIN],
    exact: true,
  },
  {
    path: "**",
    layout: LayoutPublic,
    component: NoFoundPage,
    allowedRoles: [ADMIN, CLIENT, VIEWER],
  },
]

export default routes
