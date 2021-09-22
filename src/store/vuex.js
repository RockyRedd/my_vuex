import Vue from 'vue'

// install方法，Vue.use(Vuex)时会执行此方法
function install(Vue) {
  // install内部利用mixin，使各子组件的$store指向根组件的$store
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.store) {
        // 如果是根组件
        this.$store = this.$options.store
      } else {
        // 如果是子组件
        this.$store = this.$parent && this.$parent.$store
      }
    },
  })
}

// Store类，new Vuex.Store()时产生一个实例对象
class Store {
  // 接收一个配置对象
  constructor(options) {
    // 实现getters(借助vue实例的计算属性)
    // 配置对象里的getters
    const getters = options.getters || {}
    // vue实例的计算属性
    const computed = {}
    // 在vue实例的每个计算属性中添加每个计算属性
    Object.keys(getters).forEach(key => {
      // 每个计算属性的值为一个函数，返回getters中同名函数的调用，传入state和getters
      computed[key] = function() {
        return getters[key](this.state, getters)
      }
    })
    // Store实例里的getters
    this.getters = {}
    // 访问store.getters时直接走vue实例的计算属性
    Object.keys(computed).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return this.vm[key]
        },
      })
    })
    // 实现state(借助Vue实例的data选项)
    this.vm = new Vue({
      data() {
        return {
          state: options.state,
        }
      },
      computed,
    })
    // 实现mutations
    const mutations = options.mutations || {}
    this.mutations = {}
    Object.keys(mutations).forEach(type => {
      this.mutations[type] = payload => {
        mutations[type](this.state, payload)
      }
    })
    const actions = options.actions || {}
    this.actions = {}
    Object.keys(actions).forEach(type => {
      this.actions[type] = payload => {
        actions[type](this, payload)
      }
    })
  }
  // 解决this.$store.vm.state问题
  get state() {
    return this.vm.state
  }
  // commit方法
  commit = (type, payload) => {
    this.mutations[type](payload)
  }
  // dispatch方法
  dispatch(type, payload) {
    this.actions[type](payload)
  }
}

const vuex = {
  install,
  Store,
}

export default vuex
