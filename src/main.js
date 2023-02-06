import Vue from 'vue'
import ElementUI from 'element-ui';
import Router from 'vue-router'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Router)
Vue.use(ElementUI);
Vue.config.productionTip = false
const router = new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  routes: [{
    path: '/demo1',
    component: () => import('./components/HelloWorld.vue')
  }, {
    path: '/demo2',
    component: () => import('./components/Demo2.vue')
  }, {
    path: '/demo3',
    component: () => import('./components/excelModule.vue')
  }]
})
router.beforeEach((to, from, next) => {
  next()
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
