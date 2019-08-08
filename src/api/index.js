import axios from 'axios'
import store from '@/store'
import router from '@/router'
import JsonBig from 'json-bigint'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }

axios.defaults.transformResponse = [
  (data) => {
    try {
      return JsonBig.parse(data)
    } catch (e) {
      return data
    }
  }
]

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 修改config,追加headers
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, function (error) {
  // 认为返回错误的promise对象
  return Promise.reject(error)
})
axios.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response
}, (error) => {
  // 对响应错误做点什么
  if (error.response.status === 401) {
    router.push('/login')
  }
  // return Promise.reject(error)
})

export default axios
