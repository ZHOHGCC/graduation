import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http'
import 'element-ui/lib/theme-chalk/index.css';
// 按需引入 ui组件
import {
  Button,
  Select,
  Divider,
  Form,
  FormItem,
  Input,
  Radio,
  Menu,
  MenuItem,
  TableColumn,
  Table,
  Option,
  Col,
  DatePicker,
  Pagination,
  Submenu,
  Upload,
  Checkbox,
  CheckboxGroup,
  Dialog,
  CheckboxButton,
  Rate,
  TimeSelect
} from 'element-ui'
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
Vue.use(Option)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Submenu)
Vue.use(Upload)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Dialog)
Vue.use(CheckboxButton)
Vue.use(Rate)
Vue.use(Divider)
Vue.use(TimeSelect)
// -------------------
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')