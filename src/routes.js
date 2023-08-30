import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdHome,
  MdLock,
} from "react-icons/md";

import { TbCategory } from "react-icons/tb";

// Admin Imports
import MainDashboard from "views/admin/default";
import DataTables from "views/admin/dataTables";
import Categories from "views/admin/categories";
import CategoriesNew from "views/admin/categoriesNovo";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import SignUpCentered from "views/auth/signUp"

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Transações",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Categorias",
    layout: "/admin",
    icon: <Icon as={TbCategory} width='20px' height='20px' color='inheit' />,
    path: "/categories",
    component: Categories,
  },
  {
    name: "Categorias (Novo)",
    layout: "/admin",
    icon: <Icon as={TbCategory} width='20px' height='20px' color='inheit' />,
    path: "/categoriesNew",
    component: CategoriesNew,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "/sign-up",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignUpCentered,
  }
];

export default routes;
