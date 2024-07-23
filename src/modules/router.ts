import generatedRoutes from 'virtual:generated-pages'
import { createRouter, createWebHashHistory } from 'vue-router'
import { reactive, type Plugin } from 'vue'

const _state = reactive({
  nextLocation: '',
})

export const routeState = reactive({
  isLoading: false,
})

export const install: Plugin = (app) => {
  const routes = generatedRoutes

  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })

  router.beforeEach((to) => {
    _state.nextLocation = to.fullPath
    routeState.isLoading = true
  })

  router.afterEach((to) => {
    if (_state.nextLocation === to.fullPath) {
      routeState.isLoading = false
    }
  })

  app.use(router)
}
