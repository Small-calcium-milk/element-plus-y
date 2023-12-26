// @ts-nocheck
/**
 * 工具类
 */

/**
 * 格式化日期格式 (用于兼容ios Date对象)
 */
export const formatDate = (time: string) => {
  // 将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
  return time.replace(/\-/g, '/')
}

/**
 * 对象转URL    a=123&b=456&c=789
 * @param {object} obj
 */
export const urlEncode = (obj = {}) => {
  const result = []
  for (const key in obj) {
    const item = obj[key]
    if (!item) {
      continue
    }
    if (isArray(item)) {
      item.forEach((val) => {
        result.push(key + '=' + val)
      })
    } else {
      result.push(key + '=' + item)
    }
  }
  return result.join('&')
}

/**
 * 遍历对象
 */
export const objForEach = (obj, callback) => {
  Object.keys(obj).forEach((key) => {
    callback(obj[key], key)
  })
}

/**
 * 是否在数组内
 */
export const inArray = (search, array) => {
  for (var i in array) {
    if (array[i] == search) return true
  }
  return false
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(Y)、月(m)、日(d)、小时(H)、分(M)、秒(S) 可以用 1-2 个占位符，
 * 例子：
 * dateFormat('YYYY-mm-dd HH:MM:SS', new Date()) ==> 2020-01-01 08:00:00
 */
export const dateFormat = (fmt, date) => {
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  let ret
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
      )
    }
  }
  return fmt
}

export const getYearMonthDate = (date) => {
  // 将日期以空格隔开，即['2020-06-13', '17:10:09']
  date = (date + '').split(/[ ]+/)
  let result = []
  let reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/
  // 用截取出来的年月日进行正则表达式匹配
  reg.exec(date[0])
  result.push(RegExp.$1) //获取匹配到的第一个子匹配，即‘2020’
  result.push(RegExp.$2)
  result.push(RegExp.$3)
  return result.join('-')
}

/**
 * 判断是否为空对象
 * @param {*} object 源对象
 */
export const isEmptyObject = (object) => {
  return Object.keys(object).length === 0
}

/**
 * 判断是否为对象
 * @param {*} object
 */
export const isObject = (object) => {
  return Object.prototype.toString.call(object) === '[object Object]'
}

/**
 * 判断是否为数组
 * @param {*} array
 */
export const isArray = (array) => {
  return Object.prototype.toString.call(array) === '[object Array]'
}

/**
 * 判断是否为空
 * @param {*} object 源对象
 */
export const isEmpty = (value) => {
  if (isArray(value)) {
    return value.length === 0
  }
  if (isObject(value)) {
    return isEmptyObject(value)
  }
  return !value
}

/**
 * 对象深拷贝
 * @param {*} obj 源对象
 */
export const cloneObj = (obj) => {
  let newObj = obj.constructor === Array ? [] : {}
  if (typeof obj !== 'object') {
    return
  }
  for (let i in obj) {
    newObj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]
  }
  return newObj
}

// 节流函数
// 思路： 第一次先设定一个变量true，
// 第二次执行这个函数时，会判断变量是否true，
// 是则返回。当第一次的定时器执行完函数最后会设定变量为flase。
// 那么下次判断变量时则为flase，函数会依次运行。
export function throttle(fn, delay = 100) {
  // 首先设定一个变量，在没有执行我们的定时器时为null
  var timer = null
  return function () {
    // 当我们发现这个定时器存在时，则表示定时器已经在运行中，需要返回
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

// 防抖函数
// 首次运行时把定时器赋值给一个变量， 第二次执行时，
// 如果间隔没超过定时器设定的时间则会清除掉定时器，
// 重新设定定时器， 依次反复， 当我们停止下来时，
// 没有执行清除定时器， 超过一定时间后触发回调函数。
// 参考文档：https://segmentfault.com/q/1010000021145192
export function debounce(fn, delay) {
  let timer
  return function () {
    const that = this
    const _args = arguments // 存一下传入的参数
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      fn.apply(that, _args)
    }, delay)
  }
}

/**
 * 数组交集
 * @param {Array} 数组1
 * @param {Array} 数组2
 * @return {Array}
 */
export const arrayIntersect = (array1, array2) => {
  return array1.filter((val) => array2.indexOf(val) > -1)
}

/**
 * 匹配phone
 */
export const isPhone = (str) => {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/
  return reg.test(str)
}

/**
 * 匹配Mobile
 */
export const isMobile = (str) => {
  const reg = /^(1[3456789]\d{9})$/
  return reg.test(str)
}

/**
 * 匹配Email地址
 */
export const isEmail = (str) => {
  if (str == null || str == '') return false
  var result = str.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
  if (result == null) return false
  return true
}

export const platform = () => {
  const sUserAgent = window.navigator.userAgent.toLowerCase()
  const bIsAlipayMini =
    sUserAgent.indexOf('miniprogram') > -1 && sUserAgent.indexOf('alipay') > -1
  const isWx = sUserAgent.indexOf('micromessenger') > -1
  return {
    isWx, // 微信端
    bIsAlipayMini, // 支付宝端
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

//获得页面向左、向上卷动的距离
export function getScroll() {
  return {
    left:
      window.pageXOffset ||
      document.documentElement.scrollLeft ||
      document.body.scrollLeft ||
      0,
    top:
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0,
  }
}

// 删除对象属性中空属性字段
export function deleteEmptyAttributeOfObject(obj) {
  if (isEmpty(obj)) return
  Object.keys(obj).forEach((item) => {
    if (
      obj[item] === '' ||
      obj[item] === undefined ||
      obj[item] === null ||
      obj[item] === 'null'
    )
      delete obj[item]
  })
  return obj
}

// 导出二进制文件
export function exportBinaryFile(
  data,
  type = 'application/vnd.ms-excel',
  fileName = '下载'
) {
  // 构造一个blob对象来处理数据，并设置文件类型、type为导出的文件类型 以excel为demo
  const blob = new Blob([data], { type: type })
  const href = URL.createObjectURL(blob) // 创建新的URL表示指定的blob对象
  const a = document.createElement('a') // 创建a标签
  a.style.display = 'none'
  a.href = href // 指定下载链接
  //设置指定元素上的某个属性值。如果属性已经存在，则更新该值
  a.setAttribute('download', fileName + '.xlsx')
  document.body.appendChild(a)
  a.click() // 触发下载
  document.body.removeChild(a)
  URL.revokeObjectURL(a.href) // 释放URL对象
}

/**
 * 文件地址是否带http的完整路径 不是就补上 补全 (用于兼容 相对路径)
 */
/*import { baseURL } from '@/config/index'
export const fileUrlComplete = (url) => {
  if (url.startsWith('http') || url.startsWith(baseURL)) return url
  return baseURL + url
}*/
