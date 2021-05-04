import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Order from '@/views/Order.vue'
import Product from '@/views/Product.vue'
import Stock from '@/views/Stock.vue'
import OrderCard from '@/views/OrderCard.vue'
import OrderSvc from '@/views/OrderSvc.vue'
import Login from '@/components/Login2.vue'
import VisaApply from '@/views/VisaApply.vue'
import ProductDetail from '@/components/products/list/ProductDetail.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/stock',
    name: 'Stock',
    component: Stock
  },
  {
    path: '/orderCard',
    name: 'OrderCard',
    component: OrderCard
  },
  {
    path: '/ordersvc',
    name: 'OrderSvc',
    component: OrderSvc
  },
  {
    path: '/visa',
    name: 'VisaApply',
    component: VisaApply
  },
  {
    path: '/prdtDetail',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
