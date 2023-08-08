import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  // MdOutlineShoppingCart,
} from "react-icons/md";

import { TbTargetArrow, TbCategory } from "react-icons/tb";

// Admin Imports
import MainDashboard from "views/admin/default";
// import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import Categories from "views/admin/categories"
import Goals from "views/admin/goals"

// Auth Imports
import SignInCentered from "views/auth/signIn";

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
    name: "Metas",
    layout: "/admin",
    icon: <Icon as={TbTargetArrow} width='20px' height='20px' color='inheit' />,
    path: "/goals",
    component: Goals,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  // },
  {
    name: "Perfil",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
];

export default routes;
