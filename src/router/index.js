import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Calculator from "@/components/Calculator";
import NotFound from "@/components/NotFound";
import ShopItem from "@/components/ShopItem";
import Cart from "@/components/Cart";
import Shop from "@/components/Shop";
import Contacts from "@/components/Contacts";
import Confirmation from "@/components/Confirmation";
import PersonalAccount from "@/views/Account/PersonalAccount";
import Profile from "@/components/Account/Profile";
import Registration from "@/components/Registration";
import CategoryManagement from "@/components/Admin/CategoryManagement";
import ProductManagement from "@/components/Admin/ProductManagement";
import AddItem from "@/components/Admin/AddItem";
import Orders from "@/components/Admin/Orders";
import UserOrders from "@/components/Account/UserOrders";
import Order from "@/components/Account/Order";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
  },
  {
    path: '/shop/:id',
    name: 'ShopItem',
    component: ShopItem,
    props: true,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: Confirmation,
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: Calculator
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/account',
    name: 'PersonalAccount',
    component: PersonalAccount,
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: Profile
      },
      {
        path: 'category_management',
        name: 'categoryManagement',
        component: CategoryManagement
      },
      {
        path: 'product_management',
        name: 'productManagement',
        component: ProductManagement
      },
      {
        path: 'add_item',
        name: 'addItem',
        component: AddItem
      },
      {
        path: 'orders',
        name: 'orders',
        component: Orders
      },
      {
        path: 'user_orders',
        name: 'userOrders',
        component: UserOrders
      },
      {
        path: 'order_info/:id',
        name: 'orderInfo',
        component: Order,
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
