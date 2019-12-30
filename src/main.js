import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http'
import 'element-ui/lib/theme-chalk/index.css';
// 按需引入 ui组件
import { Button, Select, Slider, Form, FormItem, Input, Radio, Menu, MenuItem, TableColumn, Table } from 'element-ui'
Vue.prototype.$axios = axios

Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(TableColumn)
Vue.use(Table)
// -------------------
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App),
    mounted () {
        document.dispatchEvent(new Event('render-event'))
    }
}).$mount('#app')
